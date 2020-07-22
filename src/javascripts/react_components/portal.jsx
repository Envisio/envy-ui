import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ children, domId }) => {
  const mount = document.querySelectorAll(domId)[0] || document.getElementsByTagName('body')[0];
  // const el = document.createElement('div');
  // console.log(mount);
  // useEffect(() => {
  //   mount.appendChild(el);
  //   return () => mount.removeChild(el);
  // }, [el, mount]);

  return createPortal(children, mount);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  domId: PropTypes.string.isRequired,
};

export default Portal;

