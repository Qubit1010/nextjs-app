// import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const { Fragment } = require("react");

function MeetupDetails(props) {
  return (
    // <h1>Hee</h1>
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="decription" content={props.meetupData.description} />
      </Head>
      <img src={props.meetupData.image} />
      <h1>{props.meetupData.title}</h1>
      <address>{props.meetupData.address}</address>
      <p>{props.meetupData.description}</p>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hassanaleem86:YBcOXVdYAxGmq2Cl@next.gv9e6au.mongodb.net/meetups"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// Static Site Generation(SSG)
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://hassanaleem86:YBcOXVdYAxGmq2Cl@next.gv9e6au.mongodb.net/meetups"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const newMid = new ObjectId(meetupId);
  const selectedMeetup = await meetupsCollection.findOne({ _id: newMid });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 5,
  };
}

export default MeetupDetails;
