export default {
  '@global': {
    '.env-card': {
      border: '1px solid #d1d4e4',
      borderRadius: 3,
      backgroundColor: '#ffffff',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
    },
    '.env-card--status-pending': {
      position: 'relative'
    },
    '.env-card--status-pending::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#8c8b8c'
    },
    '.env-card--status-on-track': {
      position: 'relative'
    },
    '.env-card--status-on-track::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#57a92b'
    },
    '.env-card--status-minor-disruption': {
      position: 'relative'
    },
    '.env-card--status-minor-disruption::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#ffd700'
    },
    '.env-card--status-major-disruption': {
      position: 'relative'
    },
    '.env-card--status-major-disruption::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#e30022'
    },
    '.env-card--status-upcoming': {
      position: 'relative'
    },
    '.env-card--status-upcoming::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#8b65a1'
    },
    '.env-card--status-discontinued': {
      position: 'relative'
    },
    '.env-card--status-discontinued::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#36312d'
    },
    '.env-card--status-completed': {
      position: 'relative'
    },
    '.env-card--status-completed::before': {
      content: '\'\'',
      position: 'absolute',
      maxWidth: 5,
      minWidth: 5,
      height: '100%',
      borderRadius: '2px 0 0 2px',
      left: '0',
      top: '0',
      backgroundColor: '#1565C0'
    },
    '.env-card--plain': {
      backgroundColor: '#f7f7f7',
      border: '1px solid #eaeaea',
      boxShadow: 'none'
    },
    '.env-card--brand-border': {
      border: '5px solid #066a8d'
    },
    '.env-card--brand': {
      backgroundColor: '#066a8d',
      border: '1px solid #055875'
    },
    '.env-card--no-shadow': {
      boxShadow: 'none'
    },
    '.env-card--shadow-strong': {
      boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15)'
    },
    '.env-card--shadow-xstrong': {
      boxShadow: '1px 2px 6px 2px rgba(0, 0, 0, 0.15)'
    },
    '.env-button': {
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      cursor: 'pointer',
      fontSize: 14
    },
    '@keyframes button-loader-spin': {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    },
    '.env-button--hover:not(.env-button--inactive), .env-button:hover:not(.env-button--inactive), .env-button--focus:not(.env-button--inactive), .env-button:focus:not(.env-button--inactive)': {
      textDecoration: 'none',
      cursor: 'pointer'
    },
    '.env-button__content': {
      display: 'flex',
      width: '100%',
      height: '2.5em',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 10px',
      border: '1px solid transparent',
      borderRadius: 3,
      lineHeight: 'normal'
    },
    '.env-button__content:focus': {
      outline: 'none'
    },
    '.env-button--focus:not(.env-button--inactive), .env-button:focus:not(.env-button--inactive)': {
      outline: 'none'
    },
    '.env-button--focus:not(.env-button--inactive) > .env-button__content, .env-button:focus:not(.env-button--inactive) > .env-button__content': {
      border: '1px solid #76bcd0',
      boxShadow: 'inset 0 0 1px 3px rgba(118, 188, 208, 0.3)',
      outline: 'none'
    },
    '.env-button--link': {
      color: '#066a8d'
    },
    '.env-button--link.env-button--hover, .env-button--link:hover': {
      color: '#007ca0'
    },
    '.env-button--link.env-button--active > .env-button__content, .env-button--link:active > .env-button__content': {
      color: '#006887',
      filter: 'contrast(130%)'
    },
    '.env-button--link.env-button--disabled, .env-button--link[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--link.env-button--disabled > .env-button__content, .env-button--link.env-button--disabled > .env-button__content:hover, .env-button--link[disabled] > .env-button__content, .env-button--link[disabled] > .env-button__content:hover': {
      color: '#066a8d'
    },
    '.env-button--gray': {
      color: '#888888'
    },
    '.env-button--gray.env-button--hover, .env-button--gray:hover': {
      color: '#555555'
    },
    '.env-button--gray.env-button--active > .env-button__content, .env-button--gray:active > .env-button__content': {
      color: '#484848',
      filter: 'contrast(130%)'
    },
    '.env-button--gray.env-button--disabled, .env-button--gray[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--gray.env-button--disabled > .env-button__content, .env-button--gray.env-button--disabled > .env-button__content:hover, .env-button--gray[disabled] > .env-button__content, .env-button--gray[disabled] > .env-button__content:hover': {
      color: '#888888'
    },
    '.env-button--clean': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--clean.env-button--disabled, .env-button--clean[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--default': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--default > .env-button__content': {
      backgroundColor: '#ffffff',
      color: '#404040',
      border: '1px solid #cccccc'
    },
    '.env-button--default.env-button--hover:not(.env-button--inactive) > .env-button__content, .env-button--default:hover:not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#f1f2f7'
    },
    '.env-button--default.env-button--focus:not(.env-button--inactive) > .env-button__content, .env-button--default:focus:not(.env-button--inactive) > .env-button__content': {
      border: '1px solid #76bcd0',
      boxShadow: 'inset 0 0 1px 3px rgba(118, 188, 208, 0.3)',
      outline: 'none'
    },
    '.env-button--default.env-button--active:not(.env-button--inactive) > .env-button__content, .env-button--default:active:not(.env-button--inactive) > .env-button__content': {
      background: '#dff0f6',
      borderColor: '#76bcd0'
    },
    '.env-button--default.env-button--disabled, .env-button--default[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--default.env-button--disabled > .env-button__content, .env-button--default.env-button--disabled > .env-button__content:hover, .env-button--default[disabled] > .env-button__content, .env-button--default[disabled] > .env-button__content:hover': {
      backgroundColor: '#ffffff',
      color: '#404040',
      borderColor: '#cccccc'
    },
    '.env-button--mint-blue': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--mint-blue > .env-button__content': {
      backgroundColor: '#007da5',
      color: '#ffffff',
      border: '1px solid #005672'
    },
    '.env-button--mint-blue.env-button--hover:not(.env-button--inactive) > .env-button__content, .env-button--mint-blue:hover:not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#006281'
    },
    '.env-button--mint-blue.env-button--focus:not(.env-button--inactive) > .env-button__content, .env-button--mint-blue:focus:not(.env-button--inactive) > .env-button__content': {
      border: '1px solid #005672',
      boxShadow: 'inset 0 0 1px 3px rgba(255, 255, 255, 0.4)',
      outline: 'none'
    },
    '.env-button--mint-blue.env-button--active:not(.env-button--inactive) > .env-button__content, .env-button--mint-blue:active:not(.env-button--inactive) > .env-button__content': {
      background: '#0090bf',
      borderColor: '#005672'
    },
    '.env-button--mint-blue.env-button--disabled, .env-button--mint-blue[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--mint-blue.env-button--disabled > .env-button__content, .env-button--mint-blue.env-button--disabled > .env-button__content:hover, .env-button--mint-blue[disabled] > .env-button__content, .env-button--mint-blue[disabled] > .env-button__content:hover': {
      backgroundColor: '#007da5',
      color: '#ffffff',
      borderColor: '#005672'
    },
    '.env-button--light-blue': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--light-blue > .env-button__content': {
      backgroundColor: '#51b6d4',
      color: '#ffffff',
      border: '1px solid #30a1c2'
    },
    '.env-button--light-blue.env-button--hover:not(.env-button--inactive) > .env-button__content, .env-button--light-blue:hover:not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#34aacd'
    },
    '.env-button--light-blue.env-button--focus:not(.env-button--inactive) > .env-button__content, .env-button--light-blue:focus:not(.env-button--inactive) > .env-button__content': {
      border: '1px solid #30a1c2',
      boxShadow: 'inset 0 0 1px 3px rgba(255, 255, 255, 0.6)',
      outline: 'none'
    },
    '.env-button--light-blue.env-button--active:not(.env-button--inactive) > .env-button__content, .env-button--light-blue:active:not(.env-button--inactive) > .env-button__content': {
      background: '#36c5ef',
      borderColor: '#30a1c2'
    },
    '.env-button--light-blue.env-button--disabled, .env-button--light-blue[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--light-blue.env-button--disabled > .env-button__content, .env-button--light-blue.env-button--disabled > .env-button__content:hover, .env-button--light-blue[disabled] > .env-button__content, .env-button--light-blue[disabled] > .env-button__content:hover': {
      backgroundColor: '#51b6d4',
      color: '#ffffff',
      borderColor: '#30a1c2'
    },
    '.env-button--green': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--green > .env-button__content': {
      backgroundColor: '#3c763d',
      color: '#ffffff',
      border: '1px solid #2b542c'
    },
    '.env-button--green.env-button--hover:not(.env-button--inactive) > .env-button__content, .env-button--green:hover:not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#336534'
    },
    '.env-button--green.env-button--focus:not(.env-button--inactive) > .env-button__content, .env-button--green:focus:not(.env-button--inactive) > .env-button__content': {
      border: '1px solid #2b542c',
      boxShadow: 'inset 0 0 1px 3px rgba(255, 255, 255, 0.4)',
      outline: 'none'
    },
    '.env-button--green.env-button--active:not(.env-button--inactive) > .env-button__content, .env-button--green:active:not(.env-button--inactive) > .env-button__content': {
      background: '#268c28',
      borderColor: '#2b542c'
    },
    '.env-button--green.env-button--disabled, .env-button--green[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--green.env-button--disabled > .env-button__content, .env-button--green.env-button--disabled > .env-button__content:hover, .env-button--green[disabled] > .env-button__content, .env-button--green[disabled] > .env-button__content:hover': {
      backgroundColor: '#3c763d',
      color: '#ffffff',
      borderColor: '#2b542c'
    },
    '.env-button--red': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--red > .env-button__content': {
      backgroundColor: '#cc181e',
      color: '#ffffff',
      border: '1px solid #9e1317'
    },
    '.env-button--red.env-button--hover:not(.env-button--inactive) > .env-button__content, .env-button--red:hover:not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#b5151b'
    },
    '.env-button--red.env-button--focus:not(.env-button--inactive) > .env-button__content, .env-button--red:focus:not(.env-button--inactive) > .env-button__content': {
      border: '1px solid #9e1317',
      boxShadow: 'inset 0 0 1px 3px rgba(255, 255, 255, 0.4)',
      outline: 'none'
    },
    '.env-button--red.env-button--active:not(.env-button--inactive) > .env-button__content, .env-button--red:active:not(.env-button--inactive) > .env-button__content': {
      background: '#e40008',
      borderColor: '#9e1317'
    },
    '.env-button--red.env-button--disabled, .env-button--red[disabled]': {
      cursor: 'default !important',
      boxShadow: 'none',
      opacity: '0.5',
      filter: 'saturate(50%)'
    },
    '.env-button--red.env-button--disabled > .env-button__content, .env-button--red.env-button--disabled > .env-button__content:hover, .env-button--red[disabled] > .env-button__content, .env-button--red[disabled] > .env-button__content:hover': {
      backgroundColor: '#cc181e',
      color: '#ffffff',
      borderColor: '#9e1317'
    },
    '.env-button--inactive': {
      cursor: 'default',
      boxShadow: 'none',
      outline: 'none'
    },
    '.env-button--menu > .env-button__content, .env-button--menu-top > .env-button__content, .env-button--menu-bottom > .env-button__content': {
      justifyContent: 'start'
    },
    '.env-button--menu > .env-button__content': {
      borderRadius: '0'
    },
    '.env-button--menu-top > .env-button__content': {
      borderRadius: '2px 2px 0 0'
    },
    '.env-button--menu-bottom > .env-button__content': {
      borderRadius: '0 0 2px 2px'
    },
    '.env-button--round-hover': {
      border: '0',
      backgroundColor: 'transparent'
    },
    '.env-button--round-hover > .env-button__content': {
      minHeight: '2.5em',
      minWidth: '2.5em',
      padding: '0',
      borderRadius: '50%'
    },
    '.env-button--round-hover > .env-button__content:hover': {
      backgroundColor: '#ffffff'
    },
    '.env-button--round-hover:focus > .env-button__content': {
      border: '1px solid #76bcd0',
      boxShadow: 'inset 0 0 1px 3px rgba(118, 188, 208, 0.3)',
      outline: 'none'
    },
    '.env-button--round-hover.env-button--disabled > .env-button__content:hover, .env-button--round-hover[disabled] > .env-button__content:hover': {
      backgroundColor: 'transparent'
    },
    '.env-button--hover-white.env-button--hover:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-white:hover:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#ffffff'
    },
    '.env-button--hover-white.env-button--active:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-white:active:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#dff0f6'
    },
    '.env-button--hover-default.env-button--hover:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-default:hover:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#f1f2f7'
    },
    '.env-button--hover-default.env-button--active:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-default:active:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#dff0f6'
    },
    '.env-button--hover-menu.env-button--focus:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-menu:focus:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-menu.env-button--hover:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-menu:hover:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#d3ebf3'
    },
    '.env-button--hover-menu.env-button--active:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content, .env-button--hover-menu:active:not([disabled]):not(.env-button--disabled):not(.env-button--inactive) > .env-button__content': {
      backgroundColor: '#abd9e8'
    },
    '.env-button--round > .env-button__content': {
      borderRadius: '1.25em'
    },
    '.env-button--circle': {
      border: '0',
      backgroundColor: 'transparent',
      borderRadius: '50%'
    },
    '.env-button--circle > .env-button__content': {
      width: '2.5em',
      padding: '0',
      borderRadius: '50%'
    },
    '.env-button--small > .env-button__content': {
      height: '1.78571em'
    },
    '.env-button--small.env-button--round > .env-button__content': {
      borderRadius: '0.89286em'
    },
    '.env-button--small.env-button--circle > .env-button__content': {
      padding: '0',
      borderRadius: '0.89286em',
      width: '1.78571em'
    },
    '.env-button--xsmall > .env-button__content': {
      fontSize: 10,
      padding: '0 5px',
      height: '1.28571em'
    },
    '.env-button--xsmall.env-button--round > .env-button__content': {
      borderRadius: '0.64286em'
    },
    '.env-button--xsmall.env-button--circle > .env-button__content': {
      borderRadius: '0.64286em',
      width: '1.28571em',
      padding: '0'
    },
    '.env-button--large > .env-button__content': {
      height: '3.21429em',
      padding: '0 15px'
    },
    '.env-button--large.env-button--round > .env-button__content': {
      borderRadius: '1.60714em'
    },
    '.env-button--large.env-button--circle > .env-button__content': {
      borderRadius: '1.60714em',
      width: '3.21429em',
      padding: '0'
    },
    '.env-button--inline .env-button__content': {
      height: 'auto',
      padding: '2px 5px'
    },
    '.env-button--loading': {
      position: 'relative'
    },
    '.env-button--loading::after': {
      content: '""',
      display: 'inline-block',
      width: 20,
      height: 20,
      position: 'absolute',
      left: 'calc(50% - 10px)',
      top: 'calc(50% - 10px)',
      backfaceVisibility: 'hidden',
      borderRadius: '50%',
      border: '0.3em solid rgba(241, 242, 247, 0.7)',
      borderLeftColor: 'transparent',
      transformOrigin: 'center center',
      animation: 'button-loader-spin 2s infinite linear'
    },
    '.env-button--loading.env-button--clean::after, .env-button--loading.env-button--default::after': {
      borderColor: '#cccccc',
      borderLeftColor: 'transparent'
    },
    '.env-button--loading > .env-button__content': {
      color: 'transparent !important'
    },
    '.env-button--hover-remove-person:focus:not([disabled]) > .env-button__content, .env-button--hover-remove-person:hover:not([disabled]) > .env-button__content': {
      position: 'relative',
      borderColor: '#cc181e',
      backgroundColor: '#ffffff',
      color: 'transparent'
    },
    '.env-button--hover-remove-person:focus:not([disabled]) > .env-button__content::after, .env-button--hover-remove-person:hover:not([disabled]) > .env-button__content::after': {
      content: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48cGF0aCBmaWxsPSIjY2MxODFlIiBkPSJNNTgyLjYgMjQwbDU1LTU1YzMuMS0zLjEgMy4xLTguMiAwLTExLjNsLTExLjMtMTEuM2MtMy4xLTMuMS04LjItMy4xLTExLjMgMGwtNTUgNTUtNTUtNTVjLTMuMS0zLjEtOC4yLTMuMS0xMS4zIDBsLTExLjMgMTEuM2MtMy4xIDMuMS0zLjEgOC4yIDAgMTEuM2w1NSA1NS01NSA1NWMtMy4xIDMuMS0zLjEgOC4yIDAgMTEuM2wxMS4zIDExLjNjMy4xIDMuMSA4LjIgMy4xIDExLjMgMGw1NS01NSA1NSA1NWMzLjEgMy4xIDguMiAzLjEgMTEuMyAwbDExLjMtMTEuM2MzLjEtMy4xIDMuMS04LjIgMC0xMS4zbC01NS01NXpNMjI0IDI1NmM3MC43IDAgMTI4LTU3LjMgMTI4LTEyOFMyOTQuNyAwIDIyNCAwIDk2IDU3LjMgOTYgMTI4czU3LjMgMTI4IDEyOCAxMjh6bTAtMjI0YzUyLjkgMCA5NiA0My4xIDk2IDk2cy00My4xIDk2LTk2IDk2LTk2LTQzLjEtOTYtOTYgNDMuMS05NiA5Ni05NnptODkuNiAyNTZjLTI4LjcgMC00Mi41IDE2LTg5LjYgMTYtNDcuMSAwLTYwLjgtMTYtODkuNi0xNkM2MC4yIDI4OCAwIDM0OC4yIDAgNDIyLjRWNDY0YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDM1MmMyNi41IDAgNDgtMjEuNSA0OC00OHYtNDEuNmMwLTc0LjItNjAuMi0xMzQuNC0xMzQuNC0xMzQuNHpNNDE2IDQ2NGMwIDguOC03LjIgMTYtMTYgMTZINDhjLTguOCAwLTE2LTcuMi0xNi0xNnYtNDEuNkMzMiAzNjUuOSA3Ny45IDMyMCAxMzQuNCAzMjBjMTkuNiAwIDM5LjEgMTYgODkuNiAxNiA1MC40IDAgNzAtMTYgODkuNi0xNiA1Ni41IDAgMTAyLjQgNDUuOSAxMDIuNCAxMDIuNFY0NjR6Ii8+PC9zdmc+")',
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      padding: '19% 12% 0% 17%',
      right: '0',
      top: '0',
      color: '#cc181e',
      backgroundColor: '#ffffff',
      border: '1px solid transparent'
    },
    '.env-button--hover-remove-person:focus:not([disabled]) > .env-button__content::after': {
      border: '1px solid #f6b0b2',
      boxShadow: 'inset 0 0 1px 3px rgba(247, 185, 187, 0.4)',
      outline: 'none'
    },
    '.env-button--hover-remove-person:active:not([disabled]) > .env-button__content::after, .env-button--hover-remove-person:active:focus:not([disabled]) > .env-button__content::after': {
      backgroundColor: '#f7b9bb'
    }
  }
};
