// @flow
import { PROGRESS, ROUTES } from 'consts';
import { Navbar } from 'design';
import React from 'react';
import { useNavigate } from "react-router-dom";

type Props = {
  current: number,
  onBack?: () => void,
}

export const IntakeNavbar = ({ current, onBack }: Props) => {
  const navigate = useNavigate();

  const _onBack = () => (onBack ? onBack() : navigate(-1))
  const onClose = () => navigate(ROUTES.ABANDON)
  const progress = { current: current, steps: PROGRESS.INTAKE }
  return <Navbar onBack={_onBack} onClose={onClose} progress={progress} />
}
