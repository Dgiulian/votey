import type { NextPage } from "next";

import { prisma } from "../db/client";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ questions: any[] }> = ({ questions }) => {
  return (
    <div className={styles.container}>
      <pre>{questions}</pre>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const questions = await prisma.pollQuestion.findMany({});

  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
