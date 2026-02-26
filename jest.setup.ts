import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'node:util';

if (!global.TextEncoder) {
  // Needed by react-router in jsdom/jest.
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}
