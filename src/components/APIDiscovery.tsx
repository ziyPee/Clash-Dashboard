import * as React from 'react';
import { ThemeSwitcher } from 'src/components/shared/ThemeSwitcher';
import { DOES_NOT_SUPPORT_FETCH, errors, YacdError } from 'src/misc/errors';
import { getClashAPIConfig } from 'src/store/app';
import { fetchConfigs } from 'src/store/configs';
import { closeModal } from 'src/store/modals';
import { DispatchFn, State, StateModals } from 'src/store/types';

import { ClashAPIConfig } from '$src/types';

import APIConfig from './APIConfig';
import s0 from './APIDiscovery.module.scss';
import Modal from './Modal';
import { connect } from './StateProvider';

const { useCallback, useEffect } = React;

function APIDiscovery({ dispatch, apiConfig, modals }: {
  dispatch: DispatchFn,
  apiConfig: ClashAPIConfig,
  modals: StateModals,
}) {
  if (!window.fetch) {
    const { detail } = errors[DOES_NOT_SUPPORT_FETCH];
    const err = new YacdError(detail, DOES_NOT_SUPPORT_FETCH);
    throw err;
  }

  const closeApiConfigModal = useCallback(() => {
    dispatch(closeModal('apiConfig'));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchConfigs(apiConfig));
  }, [dispatch, apiConfig]);

  return (
    <Modal
      isOpen={modals.apiConfig}
      className={s0.content}
      overlayClassName={s0.overlay}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      onRequestClose={closeApiConfigModal}
    >
      <div className={s0.container}>
        <APIConfig />
      </div>

      <div className={s0.fixed}>
        <ThemeSwitcher />
      </div>
    </Modal>
  );
}

const mapState = (s: State) => ({
  modals: s.modals,
  apiConfig: getClashAPIConfig(s),
});

export default connect(mapState)(APIDiscovery);
