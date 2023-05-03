// import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
// import { useEffect, useState } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "1",
//     title: "First Meetup",
//     image:
//       "https://images.pexels.com/photos/12329014/pexels-photo-12329014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     address: "Some address 1210 nk",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "2",
//     title: "Second Meetup",
//     image:
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
//     address: "Some address 1210 nk",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState()

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, [])

  return (
    // <Layout>
    //   <MeetupList meetups={DUMMY_MEETUPS} />
    // </Layout>
    // <MeetupList meetups={DUMMY_MEETUPS} />
    <>
    <Head>
      <title>MeetpUp</title>
      <meta name="decription" content="Browse a huge list of highly active meetups!"/>
    </Head>
    <MeetupList meetups={props.meetups} />
    </>
  );
}

// Static Site Generation(SSG)
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://hassanaleem86:YBcOXVdYAxGmq2Cl@next.gv9e6au.mongodb.net/meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// Server Side Rendering(SSR)
// export async function getServerSideProps(context){
//   // const req = context.req;
//   // const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
