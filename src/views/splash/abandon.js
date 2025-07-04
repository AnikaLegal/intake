// @flow
import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import { IMAGES, LINKS } from 'consts';
import { BigButton, Splash, Text } from 'design';
import { useScrollTop } from 'utils';

export const AbandonView = () => {
  useScrollTop()
  const navigate = useNavigate();
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.DESK_LADY} />
      <Splash.Content>
        <Text.Header splash>
          Are you sure you want to abandon your case?
        </Text.Header>
        <Text.Body splash>
          Life can get busy quick and we appreciate the effort you have taken to
          start your journey with Anika. You are only a few steps away from
          creating a case and then we will take care of everthing else.
        </Text.Body>

        <Splash.ButtonGroup>
          <Splash.Button primary onClick={() => navigate(-1)}>
            Continue
          </Splash.Button>
          <a href={LINKS.HOME}>
            <Splash.Button last>Abandon case</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}
