import "./App.css";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import Axios from "axios";

function App() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const isLoading = useSessionContext();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  if (isLoading) {
    <></>;
  }

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error Logging In");
      console.log(error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const createCalendar = async () => {
    const event = {
      summary: eventName,
      description: eventDesc,
      start: {
        dateTime: start.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
      end: {
        dateTime: end.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {session ? (
          <>
            <h2>{session.user.email}</h2>
            <p>Start of your event</p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>End of your event</p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p>Event Name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event Description</p>
            <input type="text" onChange={(e) => setEventDesc(e.target.value)} />
            <hr />
            <button onClick={createCalendar}>Create Calendar Event</button>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={googleSignIn}>Sign in With Google</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
