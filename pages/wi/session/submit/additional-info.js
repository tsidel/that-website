import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ContentSection from '../../../../components/shared/ContentSection';

import Header from '../../../../components/Session/Submit/Header';
import AdditionalInfo from '../../../../components/Session/Submit/AdditionalInfo';

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

const SessionAdditionalInfo = ({ currentUser }) => {
  if (_.isEmpty(currentUser)) {
    Router.push('/api/login?redirect-url=/member/edit');
  }
  const { loading: memberLoading, error: memberError, data } = useQuery(
    GET_MEMBER,
  );

  if (memberLoading) return null;
  if (memberError) return null;

  const member = data.members.me;

  if (!member) {
    Router.push('/member/create');
  }
  return (
    <div>
      <Head>
        <title key="title">
          Session Submission: Additional Info - THAT Conference
        </title>
      </Head>
      <ContentSection forForm>
        <Header title="Additional Info" currentStep="2" />
        <AdditionalInfo />
      </ContentSection>
    </div>
  );
};

export default SessionAdditionalInfo;
