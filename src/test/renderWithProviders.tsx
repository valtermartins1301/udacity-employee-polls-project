import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { createTestStore } from '@/test/createTestStore';

const engine = new Styletron();

export function renderWithProviders(ui: ReactElement) {
  const store = createTestStore();
  const rendered = render(
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
      </BaseProvider>
    </StyletronProvider>,
  );

  return {
    store,
    ...rendered,
  };
}
