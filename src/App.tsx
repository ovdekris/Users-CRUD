import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {UserList} from "./components/users/UserList.tsx";
import {PostList} from "./components/posts/PostList.tsx";
import {ROUTES} from "./utils/constants.ts";
import {NotificationProvider} from "./context/NotificationContext.tsx";
import {NotificationContainer} from "./components/common/NotificationContainer.tsx";
import {OfflineProvider} from "./context/OfflineContext.tsx";
import {OfflineBanner} from "./components/common/OfflineBanner.tsx";
import {ErrorBoundary} from "./components/common/ErrorBoundary.tsx";

function App() {

  return (
    <ErrorBoundary>
        <OfflineProvider>
            <NotificationProvider>
                <OfflineBanner/>
                <BrowserRouter>
                    <Routes>
                        <Route path={ROUTES.HOME} element={<UserList/>}/>
                        <Route path={ROUTES.USER_POSTS_PATTERN} element={<PostList/>}/>
                    </Routes>
                </BrowserRouter>
                <NotificationContainer/>
            </NotificationProvider>
        </OfflineProvider>
    </ErrorBoundary>
  )
}

export default App
