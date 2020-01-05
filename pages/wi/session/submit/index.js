import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import Intro from '../../../../components/Session/Submit/Intro';

const _ = require('lodash');

const GET_MEMBER = gql`
  query getMember {
    members {
      me {
        id
      }
    }
  }
`;

const SessionIntro = ({ currentUser }) => {
  if (_.isEmpty(currentUser)) {
    Router.push('/api/login?redirect-url=/member/edit');
  }

  const { loading: memberLoading, error: memberError, data } = useQuery(
    GET_MEMBER,
  );

  if (memberLoading) return null;
  if (memberError) return null;
  console.log('here');
  console.log(data);

  const member = data.members.me;

  if (!member) {
    Router.push('/member/create');
  }
  return (
    <div>
      <Head>
        <title key="title">Session Submission: Intro - THAT Conference</title>
      </Head>
      <ContentSection forForm>
        <Header title="Session Introduction" currentStep="0" />
        <Intro />
      </ContentSection>
    </div>
  );
};

export default SessionIntro;
