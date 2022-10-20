type menuPropType =
  {
    transformOrigin: {
      vertical: number | 'bottom' | 'top' | 'center',
      horizontal: number | 'center' | 'left' | 'right'
    },
    getcontentanchorel: null,
    PaperProps: {
      style: {
        maxHeight: string,
        maxWidth: string,
      },
    },
  }
const MenuProp :menuPropType = {
  transformOrigin: {
    vertical: 'center',
    horizontal: 'left',
  },
  getcontentanchorel: null,
  PaperProps: {
    style: {
      maxHeight: '40vh',
      maxWidth: '50vw',
    },
  },
};
export default MenuProp;
