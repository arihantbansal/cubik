import EmptyStateHOC from '~/components/HOC/EmptyState';

const ContributionsEmptyState = () => {
  return (
    <EmptyStateHOC
      heading={'No Contributions Yet'}
      subHeading={
        'This project hasn`t received any contributions yet. Be the first to support this project!'
      }
    />
  );
};

export default ContributionsEmptyState;
