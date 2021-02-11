import { AppContainer } from "./App.styles";
import { CustomDragLayer } from "../utils/globals/CustomDragLayer";
import { DashbordPage } from "../pages/DashboardPage";
import { GlobalStyle } from "../styles/globalStyles";

function App() {
  return (
    <AppContainer>
      <CustomDragLayer />
      <GlobalStyle />
      <DashbordPage />
    </AppContainer>
  );
}

export default App;
