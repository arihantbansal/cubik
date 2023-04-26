export type ContractType = {
  version: '0.1.0';
  name: 'cubik_contract_v2';
  instructions: [
    {
      name: 'createUser';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'username';
          type: 'string';
        }
      ];
    },
    {
      name: 'createProject';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        }
      ];
    },
    {
      name: 'createRound';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'matchingPool';
          type: 'u64';
        },
        {
          name: 'projectSize';
          type: 'u64';
        }
      ];
    },
    {
      name: 'createAdmin';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'projectRoundJoin';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'roundVerficationAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'roundAccount';
          type: 'publicKey';
        },
        {
          name: 'projectAccount';
          type: 'publicKey';
        }
      ];
    },
    {
      name: 'updateApproveRound';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundVerficationAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'roundId';
          type: 'string';
        },
        {
          name: 'roundAccount';
          type: 'publicKey';
        },
        {
          name: 'projectAccount';
          type: 'publicKey';
        },
        {
          name: 'counter';
          type: 'string';
        }
      ];
    },
    {
      name: 'updateRejectRound';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'roundVerficationAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'roundAccount';
          type: 'publicKey';
        },
        {
          name: 'projectAccount';
          type: 'publicKey';
        },
        {
          name: 'roundId';
          type: 'string';
        }
      ];
    },
    {
      name: 'updateProjectStatusVerify';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        }
      ];
    },
    {
      name: 'updateProjectStatusFailed';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'adminAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'projectAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'counter';
          type: 'string';
        },
        {
          name: 'owner';
          type: 'publicKey';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'Admin';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'Project';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'publicKey';
          },
          {
            name: 'counter';
            type: 'u64';
          },
          {
            name: 'status';
            type: {
              defined: 'ProjectVerification';
            };
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'Round';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'roundId';
            type: 'string';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'poolSize';
            type: 'u64';
          },
          {
            name: 'projectSize';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'RoundJoin';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'roundAccount';
            type: 'publicKey';
          },
          {
            name: 'projectAccount';
            type: 'publicKey';
          },
          {
            name: 'status';
            type: {
              defined: 'RoundProjectStatus';
            };
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'User';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'username';
            type: 'string';
          },
          {
            name: 'project';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'ProjectVerification';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'REVIEW';
          },
          {
            name: 'VERIFIED';
          },
          {
            name: 'FAILED';
          }
        ];
      };
    },
    {
      name: 'RoundProjectStatus';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'PENDING';
          },
          {
            name: 'APPROVED';
          },
          {
            name: 'REJECTED';
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'MaxLengthExceeded';
      msg: 'max length is 32';
    },
    {
      code: 6001;
      name: 'InvalidStatus';
      msg: 'invalid status';
    },
    {
      code: 6002;
      name: 'InvalidRoundAccount';
      msg: 'invalid round account';
    },
    {
      code: 6003;
      name: 'InvalidProjectVerification';
      msg: 'project not verified';
    }
  ];
  metadata: {
    address: 'Wgvt4LxST3JmUxZae5z7AYqzd63vo6EXjnW1aaMVX8L';
  };
};

export const Contract: ContractType = {
  version: '0.1.0',
  name: 'cubik_contract_v2',
  instructions: [
    {
      name: 'createUser',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'username',
          type: 'string',
        },
      ],
    },
    {
      name: 'createProject',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
      ],
    },
    {
      name: 'createRound',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'matchingPool',
          type: 'u64',
        },
        {
          name: 'projectSize',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createAdmin',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'projectRoundJoin',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'roundVerficationAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundAccount',
          type: 'publicKey',
        },
        {
          name: 'projectAccount',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateApproveRound',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundVerficationAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundId',
          type: 'string',
        },
        {
          name: 'roundAccount',
          type: 'publicKey',
        },
        {
          name: 'projectAccount',
          type: 'publicKey',
        },
        {
          name: 'counter',
          type: 'string',
        },
      ],
    },
    {
      name: 'updateRejectRound',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'roundVerficationAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'roundAccount',
          type: 'publicKey',
        },
        {
          name: 'projectAccount',
          type: 'publicKey',
        },
        {
          name: 'roundId',
          type: 'string',
        },
      ],
    },
    {
      name: 'updateProjectStatusVerify',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateProjectStatusFailed',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'adminAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'projectAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'counter',
          type: 'string',
        },
        {
          name: 'owner',
          type: 'publicKey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Admin',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Project',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'counter',
            type: 'u64',
          },
          {
            name: 'status',
            type: {
              defined: 'ProjectVerification',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Round',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'roundId',
            type: 'string',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'poolSize',
            type: 'u64',
          },
          {
            name: 'projectSize',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'RoundJoin',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'roundAccount',
            type: 'publicKey',
          },
          {
            name: 'projectAccount',
            type: 'publicKey',
          },
          {
            name: 'status',
            type: {
              defined: 'RoundProjectStatus',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'User',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'username',
            type: 'string',
          },
          {
            name: 'project',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'ProjectVerification',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'REVIEW',
          },
          {
            name: 'VERIFIED',
          },
          {
            name: 'FAILED',
          },
        ],
      },
    },
    {
      name: 'RoundProjectStatus',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'PENDING',
          },
          {
            name: 'APPROVED',
          },
          {
            name: 'REJECTED',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'MaxLengthExceeded',
      msg: 'max length is 32',
    },
    {
      code: 6001,
      name: 'InvalidStatus',
      msg: 'invalid status',
    },
    {
      code: 6002,
      name: 'InvalidRoundAccount',
      msg: 'invalid round account',
    },
    {
      code: 6003,
      name: 'InvalidProjectVerification',
      msg: 'project not verified',
    },
  ],
  metadata: {
    address: 'Wgvt4LxST3JmUxZae5z7AYqzd63vo6EXjnW1aaMVX8L',
  },
};
