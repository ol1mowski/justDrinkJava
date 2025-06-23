import { memo } from 'react';
import { JobsPage as JobsPageComponent } from '../../components/JobsPage/JobsPage.component';

export const JobsPage = memo(() => {
  return <JobsPageComponent />;
});

JobsPage.displayName = 'JobsPage';
