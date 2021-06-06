import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/PhoneInTalk';

import Whatsapp from 'assets/icons/whatsapp';
import { PhoneNumber } from 'constantsApp';
import { getUrlWhatsapp } from 'utils';

export const MoreInformation = () => {
  const [anchorEl, setAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button color="secondary" size="small" onClick={handleClick}>
        Contáctanos
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            const url = getUrlWhatsapp();
            window.open(url, '_blank')?.focus();
          }}
        >
          <ListItemIcon>
            <Whatsapp fontSize="large" color="primary" />
          </ListItemIcon>
          <Typography variant="inherit">Whatsapp</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            const url = `tel:${PhoneNumber}`;
            document.location.href = url;
          }}
        >
          <ListItemIcon>
            <PhoneIcon fontSize="large" color="action" />
          </ListItemIcon>
          <Typography variant="inherit">Teléfono</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreInformation;
