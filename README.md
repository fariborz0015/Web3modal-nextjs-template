
<p align="center">
  <a href="https://github.com/fariborz0015/Web3modal-nextjs-template" target="blank"><img src="https://github.com/fariborz0015/Web3modal-nextjs-template/blob/main/public/cover1.png?raw=true"  alt="Nest Logo" /></a>
</p>

### Warning: Ai Generated Readme

# Next.js DApp Template with Web3Modal and TailwindCSS

Jumpstart DApp development with Next.js. Easily connect wallets via Web3Modal and Wagmi, with UI powered by tailwindcss and shadcn. Includes a donate-me website example, enabling digital currency coffee purchases via wallet.

# Used stacks :

  - **Next.js**: A React framework for building server-side rendered and static web applications.
  - **Web3Modal SDK**: Simplifies the process of connecting to various Ethereum wallets for blockchain interactions.
  - **Wagmi**: Facilitates seamless wallet integration for Ethereum transactions.
  - **TailwindCSS**: A utility-first CSS framework for building custom designs with minimal CSS.
  - **shadcn**: UI framework enhancing the aesthetic appeal and user experience of the DApp.
  - **Example Donate-Me Website**: Demonstrates a use case where users can purchase digital currency coffee through wallet transactions.

# Config  :
- **step 1** : Clone the code base from git :
```bash
git clone https://github.com/fariborz0015/Web3modal-nextjs-template.git
```
- **step 2** : Create a new project in [Cloud Wallet connect](https://cloud.walletconnect.com) and copy Project id 
- **step 3** : Enter Your Project ID in `.env` file :
```bash
NEXT_PUBLIC_PROJECT_ID= <your_project_id>
NEXT_PUBLIC_MY_ACCOUNT= <your_Owen_wallet_address>
```
- **step 4** : Change chain from './src/config/index.tsx' file :
```ts
 .
 .
 .
// Create wagmiConfig
const chains = [polygon] as const;  // you can chnage the chain by attantion to your need 
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
 .
 .
 .
 .
```
# Start and Run   :
- install dependencies :
```bash
 npm install 
```
- run code base  :
```bash
 npm run dev  
```
- build :
```bash
 npm run build  
```

# structure : 

Project files and directories structure :

```bash 
-src
  |-- components          # Contains reusable React components used throughout the application.
  |
  |-- config              # Contains configuration files.
  |    |-- index.md       # Wagmi configuration
  |
  |-- contexts            # Contains context providers used for managing application-wide state.
  |    |-- index.md       # a context provider that will wrap our application and initialized Web3Modal (createWeb3Modal)
  |
  |-- layout              # Houses layout components used to structure the overall appearance of the application.
  |    |-- layout.tsx     # Main layout component.
  |
  |-- lib                 # Contains utility functions or modules used across different parts of the application.
  |    |-- utils.ts       # Utility functions.
  |
  |-- pages               # Contains the main pages of the application. Each file typically represents a single page or route.
  |    |-- _app.tsx       # Custom App component provided by Next.js.
  |    |-- _document.tsx  # Custom Document component provided by Next.js.
  |    |-- index.tsx      # Main entry point of the application.
  |
  |-- styles              # Contains global stylesheets and CSS files used to style the application.
       |-- globals.css    # Global CSS styles applied to the entire application.
```



## Contact
For any questions or inquiries, please reach out to the project maintainer:

 [![MIT License](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:Fariborz0015@gmail.com)
 [![MIT License](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/fariborzjs)



Feel free to open an issue on GitHub if you encounter any problems or have suggestions for improvement.

Happy coding! 👨‍💻
## Authors

- [@fariborz0015](https://www.github.com/fariborz0015)

 


 
