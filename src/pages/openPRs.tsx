import { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import PullRequest from 'components/pullRequests';
import fetch from '../helperFunctions/fetch';
import CardShimmer from '../components/Loaders/cardShimmer';

type pullRequestType = {
  title: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

function openPRs() {
  const url = 'https://staging-api.realdevsquad.com/pullrequests/open';
  const [pullRequests, setPullRequests] = useState<pullRequestType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch({ url });
      setPullRequests(response.data.pullRequests);

      setLoading(false);
    })();
  }, []);

  const getPRs = () => pullRequests.map((pullRequest?: pullRequestType) => {
    const {
      title, username, createdAt, updatedAt, url: link,
    } = pullRequest;
    return (
      <>
        <PullRequest
          key={link}
          title={title}
          username={username}
          createdAt={createdAt}
          updatedAt={updatedAt}
          url={link}
        />
      </>
    );
  });

  return (
    <Layout>
      <div className="container">
        {loading ? (
          <>
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />

          </>

        ) : (
          getPRs())}
      </div>
    </Layout>
  );
}

export default openPRs;
