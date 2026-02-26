import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { store } from '@/app/store';

const engine = new Styletron();

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  );
}
