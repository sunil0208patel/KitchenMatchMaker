import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { RecipeProvider } from "./context/RecipeContext";

const rootStyles = document.createElement('style');
rootStyles.innerHTML = `
  :root {
    --primary: 354 85% 70%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 174 61% 55%;
    --secondary-foreground: 0 0% 100%;
    
    --accent: 49 100% 71%;
    --accent-foreground: 215 28% 17%;
    
    --background: 210 17% 98%;
    --foreground: 215 28% 17%;
    
    --muted: 210 17% 95%;
    --muted-foreground: 215 28% 45%;
    
    --card: 0 0% 100%;
    --card-foreground: 215 28% 17%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 215 28% 17%;
    
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    
    --chart-1: var(--primary);
    --chart-2: var(--secondary);
    --chart-3: var(--accent);
    --chart-4: 215 28% 17%;
    --chart-5: 0 0% 45%;
    
    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 215 28% 17%;
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: var(--accent);
    --sidebar-accent-foreground: 215 28% 17%;
    --sidebar-border: 214.3 31.8% 91.4%;
    --sidebar-ring: var(--primary);
    
    --radius: 0.5rem;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
  }
`;

document.head.appendChild(rootStyles);

createRoot(document.getElementById("root")!).render(
  <RecipeProvider>
    <App />
  </RecipeProvider>
);
