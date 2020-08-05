export enum COLORS {
  WHITE = '#fff',
  LGRAY = '#f0f0f0',
  GRAY = '#C0C0C0',
  DGRAY = '#909090',
  MGRAY = '#757575',
  BLACK = '#474747',

  BORDER = '#E7E7E7',
  LBORDER = '#F0F5FB',

  RED = '#BF3F41',
  BLUE = '#3379BF',
  GREEN = '#60A411',
  YELLOW = '#F4CC31',

  ALTBLUE = '#3C8BD1',
}

export const KIND_COLORS = {
  primary: {
    A10: 'rgba(51,121,191,0.1)',
    A70: 'rgba(51,121,191,0.7)',
    A100: 'rgba(51,121,191,1)',
    B70: '#70a1d2',
    B20: '#d6e4f2',
    B10: '#ebf2f9',
  },

  danger: {
    A10: 'rgba(191,63,65,0.1)',
    A70: 'rgba(191,63,65,0.7)',
    A100: 'rgba(191,63,65,1)',
    B70: '#d2797a',
    B20: '#f2d9d9',
    B10: '#f9ecec',
  },

  success: {
    A10: 'rgba(96,164,17,0.1)',
    A70: 'rgba(96,164,17,0.7)',
    A100: 'rgba(96,164,17,1)',
    B70: '#90bf58',
    B20: '#dfedcf',
    B10: '#eff6e7',
  },

  warning: {
    A10: 'rgba(214,174,49,0.1)',
    A70: 'rgba(214,174,49,0.7)',
    A100: 'rgba(214,174,49,1)',
    B70: '#f7db6f',
    B20: '#fdf5d6',
    B10: '#fefaea',
  },
};

export enum PROFILE_STATUS_COLORS {
  PRODUCTION = '#60A411',
  DRAFT = '#7E7E7E',
  ARCHIVE = '#F4CC31',
}

export enum RULE_SEVERITY_COLORS {
  HIGH = '#BF3F41',
  MEDIUM = '#F4CC31',
  LOW = '#60A411',
}
