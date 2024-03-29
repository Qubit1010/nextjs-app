import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>New MeetUp</title>
        <meta
          name="decription"
          content="Add new meetups!"
        />
      </Head> 
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}
export default NewMeetupPage;
