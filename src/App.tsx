import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './presentation/screens/HomeScreen';
import { AboutScreen } from './presentation/screens/AboutScreen';
import { FAQScreen } from './presentation/screens/FAQScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/faq' element={<FAQScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;