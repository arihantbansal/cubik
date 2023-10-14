export type CubikHackathon = {
  version: "0.1.0";
  name: "cubik_hackathon";
  instructions: [
    {
      name: "hackathonInit";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "hackathonAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "counter";
          type: "u16";
        }
      ];
    },
    {
      name: "createParticipantNft";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: true;
        },
        {
          name: "participantAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "hackathonAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "powNftAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mplProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "masterEdition";
          isMut: true;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "counter";
          type: "u16";
        },
        {
          name: "hackathonAccountAuthority";
          type: "publicKey";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "metadataUrl";
          type: "string";
        }
      ];
    },
    {
      name: "participant";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "participantAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "metadataUrl";
          type: "string";
        },
        {
          name: "counter";
          type: "u16";
        },
        {
          name: "createKey";
          type: "publicKey";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "hackathon";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "counter";
            type: "u16";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "participant";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "isWinner";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};

export const IDL: CubikHackathon = {
  version: "0.1.0",
  name: "cubik_hackathon",
  instructions: [
    {
      name: "hackathonInit",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "hackathonAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "counter",
          type: "u16",
        },
      ],
    },
    {
      name: "createParticipantNft",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "participantAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "hackathonAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "powNftAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mplProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "masterEdition",
          isMut: true,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "counter",
          type: "u16",
        },
        {
          name: "hackathonAccountAuthority",
          type: "publicKey",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "metadataUrl",
          type: "string",
        },
      ],
    },
    {
      name: "participant",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "participantAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "metadataUrl",
          type: "string",
        },
        {
          name: "counter",
          type: "u16",
        },
        {
          name: "createKey",
          type: "publicKey",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "hackathon",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "counter",
            type: "u16",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "participant",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "isWinner",
            type: "bool",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};
