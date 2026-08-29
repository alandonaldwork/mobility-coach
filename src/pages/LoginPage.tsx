// import React, { FormEvent, useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowRight, Dumbbell, Flame, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';

// interface LoginPageProps {
//   onLogin: () => void;
// }

// const easeOut = [0.22, 1, 0.36, 1] as const;

// export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoggingIn, setIsLoggingIn] = useState(false);

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (
//       username.trim().toLowerCase() !== 'guest' ||
//       password !== 'guest'
//     ) {
//       setError('That doesn’t match the guest access details. Try guest / guest.');
//       return;
//     }

//     setIsLoggingIn(true);

//     localStorage.setItem('elite_mobility_login_status', 'true');
//     localStorage.setItem('elite_mobility_logged_in_user', 'guest');

//     // Give the exit animation time to complete.
//     setTimeout(() => {
//       onLogin();
//     }, 450);
//   };

//   return (
//     <motion.main
//       initial="hidden"
//       animate={isLoggingIn ? 'exit' : 'visible'}
//       className="min-h-screen bg-surface-base text-content-primary overflow-hidden relative selection:bg-volt selection:text-surface-base"
//       variants={{
//         hidden: {},
//         visible: {},
//         exit: {},
//       }}
//     >
//       {/* Background grid */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{
//           opacity: isLoggingIn ? 0 : 0.25,
//           scale: isLoggingIn ? 1.04 : 1,
//         }}
//         transition={{ duration: 0.4, ease: easeOut }}
//         className="absolute inset-0"
//         style={{
//           backgroundImage:
//             'linear-gradient(rgba(197,241,53,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(197,241,53,0.11) 1px, transparent 1px)',
//           backgroundSize: '56px 56px',
//           maskImage: 'linear-gradient(to bottom, black, transparent 74%)',
//         }}
//       />

//       {/* Green ambient glow */}
//       <motion.div
//         initial={{
//           opacity: 0,
//           scale: 0.85,
//         }}
//         animate={{
//           opacity: isLoggingIn ? 0 : 1,
//           scale: isLoggingIn ? 1.2 : 1,
//         }}
//         transition={{
//           duration: isLoggingIn ? 0.4 : 1.2,
//           delay: isLoggingIn ? 0 : 0.1,
//           ease: easeOut,
//         }}
//         className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-volt/15 blur-[120px]"
//       />

//       {/* Orange ambient glow */}
//       <motion.div
//         initial={{
//           opacity: 0,
//           scale: 0.9,
//         }}
//         animate={{
//           opacity: isLoggingIn ? 0 : 1,
//           scale: isLoggingIn ? 1.15 : 1,
//         }}
//         transition={{
//           duration: isLoggingIn ? 0.4 : 1.2,
//           delay: isLoggingIn ? 0 : 0.2,
//           ease: easeOut,
//         }}
//         className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-ember/10 blur-[120px]"
//       />

//       <div className="relative min-h-screen max-w-6xl mx-auto px-5 sm:px-8 py-7 sm:py-10 flex items-center">
//         <div className="w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 items-center">

//           {/* ========================================================= */}
//           {/* LEFT SIDE */}
//           {/* ========================================================= */}

//           <motion.section
//             initial="hidden"
//             animate={isLoggingIn ? 'exit' : 'visible'}
//             variants={{
//               hidden: {},
//               visible: {},
//               exit: {
//                 opacity: 0,
//                 x: -30,
//                 scale: 0.98,
//                 transition: {
//                   duration: 0.35,
//                   ease: easeOut,
//                 },
//               },
//             }}
//             className="max-w-xl lg:pb-10"
//           >
//             {/* Eyebrow */}
//             <motion.div
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: 14,
//                 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.45,
//                     delay: 0.1,
//                     ease: easeOut,
//                   },
//                 },
//               }}
//               className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-volt uppercase"
//             >
//               <motion.span
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{
//                   delay: 0.25,
//                   duration: 0.35,
//                   ease: easeOut,
//                 }}
//                 className="w-2 h-2 bg-volt rounded-full shadow-volt"
//               />

//               Elite Athlete / Mobility Coach
//             </motion.div>

//             {/* Heading */}
//             <motion.h1
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: 28,
//                 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.65,
//                     delay: 0.2,
//                     ease: easeOut,
//                   },
//                 },
//               }}
//               className="mt-6 text-5xl sm:text-7xl font-black tracking-[-0.06em] leading-[0.91] text-content-primary"
//             >
//               Your body
//               <br />
//               remembers <span className="text-volt">every</span>
//               <br />
//               session.
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: 18,
//                 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.5,
//                     delay: 0.35,
//                     ease: easeOut,
//                   },
//                 },
//               }}
//               className="mt-6 max-w-md text-content-secondary leading-relaxed text-sm sm:text-base"
//             >
//               Build the range, resilience, and repeatability that lets you
//               play at your best—day after day.
//             </motion.p>

//             {/* Motivation block */}
//             <motion.div
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   x: -20,
//                 },
//                 visible: {
//                   opacity: 1,
//                   x: 0,
//                   transition: {
//                     duration: 0.5,
//                     delay: 0.48,
//                     ease: easeOut,
//                   },
//                 },
//               }}
//               className="mt-9 flex items-center gap-3 sm:gap-4"
//             >
//               <motion.div
//                 initial={{ scale: 0.7, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{
//                   delay: 0.58,
//                   duration: 0.45,
//                   ease: easeOut,
//                 }}
//                 className="w-12 h-12 rounded-2xl bg-ember/10 border border-ember/20 flex items-center justify-center"
//               >
//                 <Flame className="w-6 h-6 text-ember" />
//               </motion.div>

//               <div>
//                 <p className="text-sm font-bold text-content-primary">
//                   Small sessions. Serious results.
//                 </p>

//                 <p className="text-xs text-content-muted mt-0.5">
//                   Show up today. Your future game feels it.
//                 </p>
//               </div>
//             </motion.div>

//             {/* MOVE / RECOVER / REPEAT */}
//             <motion.div
//               variants={{
//                 hidden: {
//                   opacity: 0,
//                   y: 12,
//                 },
//                 visible: {
//                   opacity: 1,
//                   y: 0,
//                   transition: {
//                     duration: 0.45,
//                     delay: 0.62,
//                     ease: easeOut,
//                   },
//                 },
//               }}
//               className="mt-10 flex gap-3"
//             >
//               {['MOVE', 'RECOVER', 'REPEAT'].map((item, index) => (
//                 <React.Fragment key={item}>
//                   <motion.span
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{
//                       delay: 0.7 + index * 0.08,
//                       duration: 0.3,
//                     }}
//                     className="text-[10px] font-mono tracking-[0.16em] text-content-muted"
//                   >
//                     {item}
//                   </motion.span>

//                   {index < 2 && (
//                     <span className="text-content-muted/50">/</span>
//                   )}
//                 </React.Fragment>
//               ))}
//             </motion.div>
//           </motion.section>

//           {/* ========================================================= */}
//           {/* LOGIN CARD */}
//           {/* ========================================================= */}

//           <motion.section
//             initial={{
//               opacity: 0,
//               y: 32,
//               x: 20,
//               scale: 0.94,
//             }}
//             animate={
//               isLoggingIn
//                 ? {
//                     opacity: 0,
//                     y: -20,
//                     x: 20,
//                     scale: 0.96,
//                   }
//                 : {
//                     opacity: 1,
//                     y: 0,
//                     x: 0,
//                     scale: 1,
//                   }
//             }
//             transition={
//               isLoggingIn
//                 ? {
//                     duration: 0.4,
//                     ease: easeOut,
//                   }
//                 : {
//                     duration: 0.65,
//                     delay: 0.15,
//                     ease: easeOut,
//                   }
//             }
//             className="w-full max-w-md lg:justify-self-end"
//           >
//             <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-volt/65 via-surface-border to-ember/40 shadow-elevated">

//               {/* Power-up glow */}
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   scale: 0.8,
//                 }}
//                 animate={{
//                   opacity: [0, 0.5, 0],
//                   scale: [0.8, 1.08, 1.15],
//                 }}
//                 transition={{
//                   duration: 1.1,
//                   delay: 0.35,
//                   ease: 'easeOut',
//                 }}
//                 className="absolute inset-0 rounded-[2rem] bg-volt/20 blur-2xl pointer-events-none"
//               />

//               {/* Border activation */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{
//                   opacity: [0, 1, 0.4],
//                 }}
//                 transition={{
//                   duration: 0.9,
//                   delay: 0.3,
//                   ease: 'easeOut',
//                 }}
//                 className="absolute inset-0 rounded-[2rem] ring-1 ring-volt/60 pointer-events-none"
//               />

//               <div className="relative rounded-[calc(2rem-1px)] bg-surface-card/95 backdrop-blur-xl p-6 sm:p-8">

//                 {/* Header */}
//                 <div className="flex items-center justify-between">

//                   {/* Dumbbell */}
//                   <motion.div
//                     initial={{
//                       opacity: 0,
//                       scale: 0.6,
//                       rotate: -10,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: [0.6, 1.08, 1],
//                       rotate: [-10, 2, 0],
//                     }}
//                     transition={{
//                       duration: 0.65,
//                       delay: 0.35,
//                       ease: easeOut,
//                     }}
//                     className="w-12 h-12 rounded-2xl bg-volt text-surface-base flex items-center justify-center shadow-volt"
//                   >
//                     <Dumbbell className="w-6 h-6" />
//                   </motion.div>

//                   {/* Ready badge */}
//                   <motion.div
//                     initial={{
//                       opacity: 0,
//                       scale: 0.8,
//                       x: 10,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       x: 0,
//                     }}
//                     transition={{
//                       duration: 0.45,
//                       delay: 0.65,
//                       ease: easeOut,
//                     }}
//                     className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-state-success bg-state-success/10 border border-state-success/20 px-2.5 py-1 rounded-full"
//                   >
//                     <ShieldCheck className="w-3.5 h-3.5" />
//                     READY TO TRAIN
//                   </motion.div>
//                 </div>

//                 {/* Title */}
//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                     y: 10,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.45,
//                     delay: 0.5,
//                     ease: easeOut,
//                   }}
//                 >
//                   <h2 className="mt-7 text-2xl font-extrabold tracking-tight">
//                     Step into your routine.
//                   </h2>

//                   <p className="mt-2 text-sm text-content-muted">
//                     Your streak is waiting for you on the other side.
//                   </p>
//                 </motion.div>

//                 {/* Form */}
//                 <motion.form
//                   onSubmit={handleSubmit}
//                   className="mt-7 space-y-4"
//                   noValidate
//                   initial={{
//                     opacity: 0,
//                     y: 12,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.45,
//                     delay: 0.6,
//                     ease: easeOut,
//                   }}
//                 >
//                   {/* Username */}
//                   <label className="block">
//                     <span className="text-[10px] font-bold font-mono tracking-[0.14em] text-content-muted uppercase">
//                       Username
//                     </span>

//                     <div className="mt-2 relative">
//                       <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />

//                       <input
//                         value={username}
//                         onChange={(event) => {
//                           setUsername(event.target.value);
//                           setError('');
//                         }}
//                         autoComplete="username"
//                         placeholder="Enter username"
//                         disabled={isLoggingIn}
//                         className="w-full h-12 bg-surface-elevated border border-surface-border rounded-xl pl-10 pr-4 text-sm font-medium outline-none placeholder:text-content-muted focus:border-volt/70 focus:ring-2 focus:ring-volt/10 transition-colors disabled:opacity-70"
//                       />
//                     </div>
//                   </label>

//                   {/* Password */}
//                   <label className="block">
//                     <span className="text-[10px] font-bold font-mono tracking-[0.14em] text-content-muted uppercase">
//                       Password
//                     </span>

//                     <div className="mt-2 relative">
//                       <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />

//                       <input
//                         value={password}
//                         onChange={(event) => {
//                           setPassword(event.target.value);
//                           setError('');
//                         }}
//                         type="password"
//                         autoComplete="current-password"
//                         placeholder="Enter password"
//                         disabled={isLoggingIn}
//                         className="w-full h-12 bg-surface-elevated border border-surface-border rounded-xl pl-10 pr-4 text-sm font-medium outline-none placeholder:text-content-muted focus:border-volt/70 focus:ring-2 focus:ring-volt/10 transition-colors disabled:opacity-70"
//                       />
//                     </div>
//                   </label>

//                   {/* Error */}
//                   {error && (
//                     <motion.p
//                       initial={{
//                         opacity: 0,
//                         y: -6,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         y: 0,
//                       }}
//                       role="alert"
//                       className="text-xs leading-relaxed text-state-danger bg-state-danger/10 border border-state-danger/20 rounded-xl px-3 py-2.5"
//                     >
//                       {error}
//                     </motion.p>
//                   )}

//                   {/* Submit */}
//                   <motion.button
//                     style={{marginTop:'2rem'}}
//                     type="submit"
//                     disabled={isLoggingIn}
//                     whileHover={
//                       !isLoggingIn
//                         ? {
//                             scale: 1.01,
//                           }
//                         : undefined
//                     }
//                     whileTap={
//                       !isLoggingIn
//                         ? {
//                             scale: 0.98,
//                           }
//                         : undefined
//                     }
//                     className="w-full h-12 rounded-xl bg-volt text-surface-base font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-volt hover:bg-volt/90 transition-all disabled:cursor-wait disabled:opacity-90"
//                   >
//                     {isLoggingIn ? (
//                       <>
//                         Entering the arena
//                         <motion.span
//                           animate={{ x: [0, 4, 0] }}
//                           transition={{
//                             duration: 0.7,
//                             repeat: Infinity,
//                             ease: 'easeInOut',
//                           }}
//                         >
//                           →
//                         </motion.span>
//                       </>
//                     ) : (
//                       <>
//                         Enter the arena
//                         <motion.span
//                           whileHover={{ x: 4 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <ArrowRight className="w-4 h-4" />
//                         </motion.span>
//                       </>
//                     )}
//                   </motion.button>
//                 </motion.form>

//                 {/* Guest access */}
//                 {/* <motion.div
//                   initial={{
//                     opacity: 0,
//                     y: 8,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.4,
//                     delay: 0.75,
//                     ease: easeOut,
//                   }}
//                   className="mt-6 rounded-xl bg-surface-elevated/70 border border-surface-border px-3.5 py-3 flex gap-3"
//                 >
//                   <span className="text-volt font-mono font-bold text-xs">
//                     GUEST
//                   </span>

//                   <p className="text-[11px] leading-relaxed text-content-muted">
//                     Starter access: use{' '}
//                     <strong className="text-content-primary">
//                       guest
//                     </strong>{' '}
//                     for both username and password.
//                   </p>
//                 </motion.div> */}
//               </div>
//             </div>
//           </motion.section>
//         </div>
//       </div>
//     </motion.main>
//   );
// };

import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  Flame,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim().toLowerCase() !== "guest" || password !== "guest") {
      setError(
        "That doesn’t match the guest access details. Try guest / guest.",
      );
      return;
    }

    setIsLoggingIn(true);

    localStorage.setItem("elite_mobility_login_status", "true");
    localStorage.setItem("elite_mobility_logged_in_user", "guest");

    setTimeout(() => {
      onLogin();
    }, 450);
  };

  return (
    <motion.main
      initial="hidden"
      animate={isLoggingIn ? "exit" : "visible"}
      className="min-h-screen bg-surface-base text-content-primary overflow-hidden relative selection:bg-volt selection:text-surface-base"
      variants={{
        hidden: {},
        visible: {},
        exit: {},
      }}
    >
      {/* Background grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoggingIn ? 0 : 0.25,
          scale: isLoggingIn ? 1.04 : 1,
        }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,241,53,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(197,241,53,0.11) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 74%)",
        }}
      />

      {/* Green ambient glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: isLoggingIn ? 0 : 1,
          scale: isLoggingIn ? 1.2 : 1,
        }}
        transition={{
          duration: isLoggingIn ? 0.4 : 1.2,
          delay: isLoggingIn ? 0 : 0.1,
          ease: easeOut,
        }}
        className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-volt/15 blur-[120px]"
      />

      {/* Orange ambient glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: isLoggingIn ? 0 : 1,
          scale: isLoggingIn ? 1.15 : 1,
        }}
        transition={{
          duration: isLoggingIn ? 0.4 : 1.2,
          delay: isLoggingIn ? 0 : 0.2,
          ease: easeOut,
        }}
        className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-ember/10 blur-[120px]"
      />

      <div className="relative min-h-screen max-w-6xl mx-auto px-5 sm:px-8 py-5 sm:py-10 flex items-center">
        <div className="w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-6 sm:gap-10 lg:gap-20 items-center">
          {/* ========================================================= */}
          {/* LEFT SIDE */}
          {/* ========================================================= */}

          <motion.section
            initial="hidden"
            animate={isLoggingIn ? "exit" : "visible"}
            variants={{
              hidden: {},
              visible: {},
              exit: {
                opacity: 0,
                x: -30,
                scale: 0.98,
                transition: {
                  duration: 0.35,
                  ease: easeOut,
                },
              },
            }}
            className="max-w-xl lg:pb-10"
          >
            {/* Eyebrow */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 14,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.45,
                    delay: 0.1,
                    ease: easeOut,
                  },
                },
              }}
              className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.22em] text-volt uppercase"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.25,
                  duration: 0.35,
                  ease: easeOut,
                }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-volt rounded-full shadow-volt"
              />
              Elite Athlete / Mobility Coach
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={{
                hidden: {
                  opacity: 0,
                  y: 28,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.65,
                    delay: 0.2,
                    ease: easeOut,
                  },
                },
              }}
              className="mt-4 sm:mt-6 text-[2.65rem] leading-[0.94] sm:text-7xl font-black tracking-[-0.06em] text-content-primary"
            >
              Your body
              <br />
              remembers <span className="text-volt">every</span>
              <br />
              session.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: {
                  opacity: 0,
                  y: 18,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.35,
                    ease: easeOut,
                  },
                },
              }}
              className="hidden sm:block mt-6 max-w-md text-content-secondary leading-relaxed text-sm sm:text-base"
            >
              Build the range, resilience, and repeatability that lets you play
              at your best—day after day.
            </motion.p>

            {/* Motivation block */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.48,
                    ease: easeOut,
                  },
                },
              }}
              className="hidden sm:flex mt-9 items-center gap-3 sm:gap-4"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.58,
                  duration: 0.45,
                  ease: easeOut,
                }}
                className="w-12 h-12 rounded-2xl bg-ember/10 border border-ember/20 flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-ember" />
              </motion.div>

              <div>
                <p className="text-sm font-bold text-content-primary">
                  Small sessions. Serious results.
                </p>

                <p className="text-xs text-content-muted mt-0.5">
                  Show up today. Your future game feels it.
                </p>
              </div>
            </motion.div>

            {/* MOVE / RECOVER / REPEAT */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.45,
                    delay: 0.62,
                    ease: easeOut,
                  },
                },
              }}
              className="hidden sm:flex mt-10 gap-3"
            >
              {["MOVE", "RECOVER", "REPEAT"].map((item, index) => (
                <React.Fragment key={item}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.7 + index * 0.08,
                      duration: 0.3,
                    }}
                    className="text-[10px] font-mono tracking-[0.16em] text-content-muted"
                  >
                    {item}
                  </motion.span>

                  {index < 2 && (
                    <span className="text-content-muted/50">/</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.section>

          {/* ========================================================= */}
          {/* LOGIN CARD */}
          {/* ========================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 32,
              x: 20,
              scale: 0.94,
            }}
            animate={
              isLoggingIn
                ? {
                    opacity: 0,
                    y: -20,
                    x: 20,
                    scale: 0.96,
                  }
                : {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                  }
            }
            transition={
              isLoggingIn
                ? {
                    duration: 0.4,
                    ease: easeOut,
                  }
                : {
                    duration: 0.65,
                    delay: 0.15,
                    ease: easeOut,
                  }
            }
            className="w-full max-w-md lg:justify-self-end"
          >
            <div className="relative rounded-[1.5rem] sm:rounded-[2rem] p-[1px] bg-gradient-to-br from-volt/65 via-surface-border to-ember/40 shadow-elevated">
              {/* Power-up glow */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.08, 1.15],
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.35,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] bg-volt/20 blur-2xl pointer-events-none"
              />

              {/* Border activation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.4],
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] ring-1 ring-volt/60 pointer-events-none"
              />

              <div className="relative rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)] bg-surface-card/95 backdrop-blur-xl p-5 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  {/* Dumbbell */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                      rotate: -10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: [0.6, 1.08, 1],
                      rotate: [-10, 2, 0],
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 0.35,
                      ease: easeOut,
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-volt text-surface-base flex items-center justify-center shadow-volt"
                  >
                    <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Ready badge */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: 10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.65,
                      ease: easeOut,
                    }}
                    className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold tracking-wider text-state-success bg-state-success/10 border border-state-success/20 px-2 sm:px-2.5 py-1 rounded-full"
                  >
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    READY TO TRAIN
                  </motion.div>
                </div>

                {/* Title */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.5,
                    ease: easeOut,
                  }}
                >
                  <h2 className="mt-5 sm:mt-7 text-xl sm:text-2xl font-extrabold tracking-tight">
                    Step into your routine.
                  </h2>

                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-content-muted">
                    Your streak is waiting for you on the other side.
                  </p>
                </motion.div>

                {/* Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="mt-5 sm:mt-7 space-y-3.5 sm:space-y-4"
                  noValidate
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.6,
                    ease: easeOut,
                  }}
                >
                  {/* Username */}
                  <label className="block">
                    <span className="text-[10px] font-bold font-mono tracking-[0.14em] text-content-muted uppercase">
                      Username
                    </span>

                    <div className="mt-1.5 sm:mt-2 relative">
                      <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />

                      <input
                        value={username}
                        onChange={(event) => {
                          setUsername(event.target.value);
                          setError("");
                        }}
                        autoComplete="username"
                        placeholder="Enter username"
                        disabled={isLoggingIn}
                        className="w-full h-11 sm:h-12 bg-surface-elevated border border-surface-border rounded-xl pl-10 pr-4 text-sm font-medium outline-none placeholder:text-content-muted focus:border-volt/70 focus:ring-2 focus:ring-volt/10 transition-colors disabled:opacity-70"
                      />
                    </div>
                  </label>

                  {/* Password */}
                  <label className="block">
                    <span className="text-[10px] font-bold font-mono tracking-[0.14em] text-content-muted uppercase">
                      Password
                    </span>

                    <div className="mt-1.5 sm:mt-2 relative">
                      <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />

                      <input
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setError("");
                        }}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter password"
                        disabled={isLoggingIn}
                        className="w-full h-11 sm:h-12 bg-surface-elevated border border-surface-border rounded-xl pl-10 pr-4 text-sm font-medium outline-none placeholder:text-content-muted focus:border-volt/70 focus:ring-2 focus:ring-volt/10 transition-colors disabled:opacity-70"
                      />
                    </div>
                  </label>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      role="alert"
                      className="text-xs leading-relaxed text-state-danger bg-state-danger/10 border border-state-danger/20 rounded-xl px-3 py-2.5"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <motion.button
                    style={{ marginTop: "1.5rem" }}
                    type="submit"
                    disabled={isLoggingIn}
                    whileHover={
                      !isLoggingIn
                        ? {
                            scale: 1.01,
                          }
                        : undefined
                    }
                    whileTap={
                      !isLoggingIn
                        ? {
                            scale: 0.98,
                          }
                        : undefined
                    }
                    className="w-full h-11 sm:h-12 rounded-xl bg-volt text-surface-base font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-volt hover:bg-volt/90 transition-all disabled:cursor-wait disabled:opacity-90"
                  >
                    {isLoggingIn ? (
                      <>
                        Entering the arena
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.span>
                      </>
                    ) : (
                      <>
                        Enter the arena
                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
};
