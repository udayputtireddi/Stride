import { object, text, list, attachment, HttpError } from './security.mjs';
export function validate(body) {
  object(body, ['operation', 'input']);
  const { operation, input } = body;
  let cost = 1;

  if (operation === 'search') { object(input, ['query']); text(input.query, 2000); }
  else if (operation === 'image') {
    object(input, ['data', 'mimeType']);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(input.mimeType)) throw new HttpError(400, 'Unsupported image.');
    attachment(input); cost = 3;
  } else if (operation === 'stylist') {
    object(input, ['history']);
    for (const message of list(input.history, 20)) {
      object(message, ['role', 'text']);
      if (!['user', 'model'].includes(message.role)) throw new HttpError(400, 'Invalid role.');
      text(message.text, 2000);
    }
    if (!input.history.length || input.history.at(-1).role !== 'user') throw new HttpError(400, 'Missing user message.');
  } else throw new HttpError(400, 'Unsupported AI operation.');

  return { operation, input, cost, stream: operation === 'chat' };
}
