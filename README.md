# react-modal-controller

It helps you to manage any of your modals from anywhere in your code.

  - React hooks
  - Light
  - Easy to fork

### How to use

Just wrap your app into ModalsProvider and setup initial modals:

```js
//App.jsx/tsx
import { ModalsProvider } from 'react-modal-controller';
import modals from './modals';
...
    <ModalsProvider initialModals={modals}>
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <MainPageContainer />
                </Route>
            </Switch
        </Layout>
    </ModalsProvider>
```

```js
// modals.jsx/tsx
import SignInModal from './SignInModal';
export default {
    SIGN_IN: SignInModal,
}
```

```js
//SignInModal.jsx/tsx (Example with @material-ui Dialog)
import { Dialog } from '@material-ui/core';
import { useModals } from 'react-modal-controller';
...
const SignInModal = (props) => {
    const { closeModal } = useModals();
    const { anyProp } = props;
    return (
        <Dialog onClose={closeModal} open>
            Some modal content
            { anyProp }
        </Dialog>
    );
}
export default SignInModal;
```
Then just open modals from enywhere

```js
//HomePage.jsx/tsx
import { useModals } from 'react-modal-controller';
...

const HomePage = () => {
  const { openModal } = useModals();
  return (
      <div>
          <Button onClick={() => openModal('SIGN_IN', { anyProp: 'value' })}>
            Sign In
          </Button>
      </div>
  );
};

```

### Installation

```sh
$ npm install --save react-modal-controller
```
