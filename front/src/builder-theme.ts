export const theme = {
  name: "cdsn",
  rounding: 2,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "#ff3333",
        light: "#990000"
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF"
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE"
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF"
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111"
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333"
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000"
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444"
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666"
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC"
      },
      control: "control-color",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "control-color": "#831a1a",
      "status-critical": "#b7520c",
      "status-warning": "#9f9f1c",
      "status-ok": "#0c9435",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": {
        light: "#0066CC",
        dark: "#3399FF"
      }
    },
    font: {
      family: "Merriweather",
      size: "18px",
      height: "24px",
      maxWidth: "432px"
    },
    active: {
      background: "active-background",
      color: "active-text"
    },
    hover: {
      background: "active-background",
      color: "active-text"
    },
    selected: {
      background: "selected-background",
      color: "selected-text"
    },
    control: {
      border: {
        radius: "2px"
      },
      font: {
        family: "Merriweather Sans"
      }
    },
    drop: {
      border: {
        radius: "2px"
      }
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "12px",
      xlarge: "24px"
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "4px",
          large: "6px",
          xlarge: "12px"
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "6px",
          medium: "12px",
          large: "24px",
          xlarge: "48px"
        },
        size: {
          xxsmall: "24px",
          xsmall: "48px",
          small: "96px",
          medium: "192px",
          large: "384px",
          xlarge: "768px",
          full: "100%"
        }
      },
      medium: {
        value: 1536
      },
      large: {}
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "6px",
      small: "12px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      responsiveBreakpoint: "small"
    },
    input: {
      padding: "12px",
      weight: 600
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%"
    }
  },
  chart: {},
  diagram: {
    line: {}
  },
  meter: {},
  tip: {
    content: {
      background: {
        color: "background"
      },
      elevation: "none",
      round: false
    }
  },
  button: {
    border: {
      width: "2px",
      radius: "18px"
    },
    padding: {
      vertical: "4px",
      horizontal: "22px"
    },
    font: {
      family: "Merriweather Sans"
    }
  },
  checkBox: {
    check: {
      radius: "2px"
    },
    toggle: {
      radius: "24px",
      size: "48px"
    },
    size: "24px"
  },
  radioButton: {
    size: "24px"
  },
  formField: {
    border: {
      color: "border",
      error: {
        color: {
          dark: "white",
          light: "status-critical"
        }
      },
      position: "inner",
      side: "bottom"
    },
    content: {
      pad: "small"
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium"
      }
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small"
      }
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small"
      }
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small"
      }
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small"
      }
    },
    margin: {
      bottom: "small"
    },
    round: "2px"
  },
  calendar: {
    small: {
      fontSize: "11.6px",
      lineHeight: 1.375,
      daySize: "27.43px"
    },
    medium: {
      fontSize: "18px",
      lineHeight: 1.45,
      daySize: "54.86px"
    },
    large: {
      fontSize: "37.2px",
      lineHeight: 1.11,
      daySize: "109.71px"
    }
  },
  clock: {
    analog: {
      hour: {
        width: "8px",
        size: "24px"
      },
      minute: {
        width: "4px",
        size: "12px"
      },
      second: {
        width: "3px",
        size: "9px"
      },
      size: {
        small: "72px",
        medium: "96px",
        large: "144px",
        xlarge: "216px",
        huge: "288px"
      }
    },
    digital: {
      text: {
        xsmall: {
          size: "5.199999999999999px",
          height: 1.5
        },
        small: {
          size: "11.6px",
          height: 1.43
        },
        medium: {
          size: "18px",
          height: 1.375
        },
        large: {
          size: "24.4px",
          height: 1.167
        },
        xlarge: {
          size: "30.8px",
          height: 1.1875
        },
        xxlarge: {
          size: "43.6px",
          height: 1.125
        }
      }
    }
  },
  heading: {
    level: {
      "1": {
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "1046px"
        },
        medium: {
          size: "24px",
          height: "36px",
          maxWidth: "1661px"
        },
        large: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        xlarge: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        font: {
          weight: 1000
        }
      },
      "2": {
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "1046px"
        },
        medium: {
          size: "24px",
          height: "36px",
          maxWidth: "1661px"
        },
        large: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        xlarge: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        font: {
          weight: 800
        }
      },
      "3": {
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "1046px"
        },
        medium: {
          size: "24px",
          height: "36px",
          maxWidth: "1661px"
        },
        large: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        xlarge: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        font: {
          weight: 700
        }
      },
      "4": {
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "1046px"
        },
        medium: {
          size: "24px",
          height: "36px",
          maxWidth: "1661px"
        },
        large: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        xlarge: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        }
      },
      "5": {
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "1046px"
        },
        medium: {
          size: "24px",
          height: "36px",
          maxWidth: "1661px"
        },
        large: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        xlarge: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        }
      },
      "6": {
        small: {
          size: "18px",
          height: "24px",
          maxWidth: "1046px"
        },
        medium: {
          size: "24px",
          height: "36px",
          maxWidth: "1661px"
        },
        large: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        },
        xlarge: {
          size: "36px",
          height: "48px",
          maxWidth: "2890px"
        }
      }
    },
    weight: 900,
    font: {
      family: "Merriweather Sans"
    }
  },
  paragraph: {
    small: {
      size: "15px",
      height: "21px",
      maxWidth: "355px"
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px"
    },
    large: {
      size: "24px",
      height: "30px",
      maxWidth: "586px"
    },
    xlarge: {
      size: "31px",
      height: "37px",
      maxWidth: "739px"
    },
    xxlarge: {
      size: "44px",
      height: "50px",
      maxWidth: "1046px"
    }
  },
  text: {
    xsmall: {
      size: "12px",
      height: "18px",
      maxWidth: "278px"
    },
    small: {
      size: "15px",
      height: "21px",
      maxWidth: "355px"
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px"
    },
    large: {
      size: "24px",
      height: "30px",
      maxWidth: "586px"
    },
    xlarge: {
      size: "31px",
      height: "37px",
      maxWidth: "739px"
    },
    xxlarge: {
      size: "44px",
      height: "50px",
      maxWidth: "1046px"
    }
  },
  scale: 1.6,
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF"
    }
  }
};
