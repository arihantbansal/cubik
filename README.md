<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/cubik-so/cubik">
   <img src="https://res.cloudinary.com/demonicirfan/image/upload/v1688641791/Frame_39599_4_g9o4mg.png" alt="Banner">
  </a>

  <h2 align="center">CUBIK</h2>

  <p align="center">
    Quadratic Funding Platform for Solana Community
    <br />
    <a href="https://cubik.so"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://cubik.so">Website</a>
    ·
    <a href="https://github.com/cubik-so/cubik/issues">Issues</a>
    ·
    <a href="https://gitbook.cubik.so">Gitbook</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About the Project

Cubik is a platform designed to revolutionize the way open-source projects are funded and supported. It is created with a developer-centric approach, catering to the unique challenges faced by developers while endorsing the power of community participation. 

Cubik is built on the Solana blockchain, which allows for fast, secure, and low-cost transactions. The platform is powered by a quadratic funding mechanism, which ensures that even small contributions can have a meaningful impact.  

#### Features
**Quadratic Voting**: Cubik integrates quadratic voting, ensuring that even small contributions can have a meaningful impact. This approach encourages equitable funding allocations.

**Active Community Participation**: Cubik fosters an engaged community that plays an essential role in resource distribution. This involvement ensures transparency and fairness.

**Developer Empowerment**: Developers can easily create profiles, showcase their projects, participate in hackathons, and apply for grants, all within a user-friendly interface.

**Decentralized Grant Allocation**: The platform conducts decentralized grant rounds, which allows the community to collectively decide on resource allocation, encouraging collective decision-making.

### Built with

- [Next.js](https://nextjs.org/?ref=cal.com)
- [tRPC](https://trpc.io/?ref=cal.com)
- [React.js](https://reactjs.org/?ref=cal.com)
- [Chakra UI](https://tailwindcss.com/?ref=cal.com)
- [Prisma.io](https://prisma.io/?ref=cal.com)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run cubik.so.

- Node.js (Version: >=18.x)
- mySQL (plantscale)
- pnpm _(recommended)_



## Development

### Folder 
       .
    ├── app            
    │   ├── cubik-ui                        # Frontend for cubik app          
    │   ├── backend                         # Shared backend for cubik app          
    ├── packages  
    │   ├── api (@cubik/api)                # TRPC based API service
    │   ├── database (@cubik/database)      # Prisma base database config
    │   ├── eslint-config-custom            # eslint config
    │   ├── tsconfig                        # base tsconfig 
    ├── LICENSE
    └── README.md

### Setup

1. Fork and clone the repository.

2. Install dependencies:
```bash
    pnpm install  
```
3. Genrate prisma schema.
``` bash
    pnpm run generate 
```
4. Run the frontend 
```bash
    pnpm run ui:dev
```

### Vercel

Currently Vercel Pro Plan is required to be able to Deploy this application with Vercel, due to limitations on the number of serverless functions on the free plan.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcalcom%2Fcal.com&env=DATABASE_URL,NEXT_PUBLIC_WEBAPP_URL,NEXTAUTH_URL,NEXT_PUBLIC_SECRET,CALENDSO_ENCRYPTION_KEY&envDescription=See%20all%20available%20env%20vars&envLink=https%3A%2F%2Fgithub.com%2Fcalcom%2Fcal.com%2Fblob%2Fmain%2F.env.example&project-name=cal&repo-name=cal.com&build-command=cd%20../..%20%26%26%20yarn%20build&root-directory=apps%2Fweb%2F)

<!-- RORADMAP -->

## Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/3d7d0cecfd3695e0560746ed790462b97aa860a7.svg "Repobeats analytics image")
<!-- CONTRIBUTING -->

## Contributing

Please see our [contributing guide](/CONTRIBUTING.md).