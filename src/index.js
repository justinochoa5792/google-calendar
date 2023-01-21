import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const supabase = createClient(
  "https://nlbxgtsaqgtteprvcjcv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYnhndHNhcWd0dGVwcnZjamN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzMTg1NDcsImV4cCI6MTk4OTg5NDU0N30.juGR1HkJ5_SDne5jO2zvPMAS1PtWZj-50asJFG3RdCI"
);

root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
