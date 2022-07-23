import type { NextPage } from "next";

import { prisma } from "../db/client";
import styles from "../styles/Home.module.css";

interface HomeProps {
  error: any;
  questions: any[];
}

const Home: NextPage<Partial<HomeProps>> = ({ questions, error }) => {
  return (
    <div className={styles.container}>
      <pre>{questions ? questions : error}</pre>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const questions = await prisma.pollQuestion.findMany({});

    return {
      props: {
        questions: JSON.stringify(questions),
      },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
};
