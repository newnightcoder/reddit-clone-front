const language = {
  ////////////////
  //  ENGLISH  //
  ///////////////
  english: {
    options: {
      lang: "language",
      appearance: "appearance",
      help: "help",
      subtitleLang: "You'll be able to navigate through FORUM in the language you choose.",
      subtitleMode: "Adjust Forum's interface to your liking: dark or light mode.",
    },
    appearance: {
      dark: "dark",
      light: "light",
    },
    homepage: {
      introText: "A brand new social media platform founded on the principles of sharing is caring, positive energy and fun.",
      connectLbl: "member already",
      connectBtn: "login",
      registerLbl: "new on forum",
      registerBtn: "signup",
      exploreLbl: "interested",
      exploreBtn: "explore forum",
      download: "Download the app",
    },
    error: {
      duplicateEmail: "There's already an account with this email address",
      duplicateUsername: "This username is already taken.\nPlease choose another one",
      nameTooLong: "This username is too long!\nPlease choose a shorter one.",
      emptyTitle: "Your post has no title!\nPut a word or two...",
      emptyComment: "Your comment is empty...",
      emptyReply: "Your reply is empty...",
      emptyUsername: "It's empty! Please enter your new username.",
      sameUsername: "That's the same username.\nPlease enter your new username.",
      backend: "Oops! something went wrong...",
      notFound: "No user found with this email address",
      password: "Your password is incorrect",
      database: "Sorry! Looks like our server just sneezed...\nPlease refresh the page",
      scrape: "Sorry but an error occurred while getting this article.\nPlease refresh and try again or choose another article.",
      noAuthToken: "Looks like you're not authenticated...\nPlease log in again.",
      verifyAuthToken: "Sorry we're not able to authenticate you for some reason.\nPlease log in again.",
      authToken: "Sorry but your authentication went wrong for some reason.Please log in again.",
      timeout:
        "Looks like the connexion is too slow or may have been lost...\nPlease check your internet connexion and refresh the page ",
      sizeLimit: "This image is too heavy! Maximum size is 2MB.\nPlease choose a lighter image.",
    },
    login: {
      greeting: "happy to see you again!",
      pass: "Password",
      enter: "log in",
      first: "First time on FORUM",
      registerBtn: "sign up",
    },
    signup: {
      join: "Join the community!",
      email: "Enter your email",
      pass: "Create your password",
      checkUpper: "at least 1 uppercase",
      checkLower: "at least 1 lowercase",
      checkDigit: "at least 1 digit",
      check8: "at least 8 characters",
      submit: "create my account",
      already: "I already have an account!",
      alreadyBtn: "Log in",
      stepUsername: {
        choose: "Choose your username",
        ok: "ok",
      },
      stepImage: {
        lastStep: "Last step before\njoining the community!",
        later: "Later, not now!",
      },
    },
    navbar: {
      searchPlaceholder: "Search on Forum...",
      searchPlaceholderMobile: "Search...",
      connected: "Logged in",
      visitor: "Visitor mode",
      logout: "Log out",
    },
    navbarDesktop: {
      publish: "Write a post",
      profile: "My profile",
      settings: "Settings",
      logout: "Logout",
    },
    search: {
      searchBy: "Search by",
      user: "Member",
      post: "Post",
      cancel: "cancel",
      msg: "Looking for something?\nType in the search bar above!",
    },
    menu: {
      visitor: "No profile yet",
      member: "Member for",
      profile: "My profile",
      publish: "Write a post",
      settings: "Settings",
      delete: "Delete my profile",
      status: "Status : online",
    },
    aside: {
      recentMembers: "New members",
      newMembersBtn: "See all members",
      mods: "Mod(s)",
      modsContactBtn: "Contact a mod",
      popular: "Popular posts",
      rules: {
        rules: "Rules of the Forum",
        rule_human: "Remember the human.",
        rule_irl: "Behave like you would in real life.",
        rule_source: "Look for the original source of content.",
        rule_double: "Search for duplicates before posting.",
        rule_rule: "Read the community's rules.",
        rule_msg_1: "Please respect Forum's",
        rule_msg_2: "content policy",
        rule_msg_3: "and be mindful of",
        rule_msg_4: "Forum's spirit",
      },
      footer: {
        help: "Help",
        coin: "Forum Coins",
        premium: "Forum Premium",
        gift: "Gifts",
        community: "Communities",
        re: "Re:Forum",
        topic: "Topics",
        career: "Careers",
        press: "Press",
        ads: "Ads",
        blog: "Blog",
        conditions: "Conditions",
        content: "Content Policy",
        confidentiality: "Privacy Policy",
        moderation: "Mod Policy",
        rights: "All rights reserved",
        about: "About",
        terms: "Terms of use",
      },
    },
    feed: {
      greetingVisitor: "Welcome to Forum - Take a look around!",
      greetingVisitor_mob: "Welcome to Forum\nTake a look around!",
      greetingNewUserLine1: "Welcome",
      greetingNewUserLine2: "Share and discuss with the community!",
      greetingNewUserLine2_mob: "Share with the community.",
      greetingUser: "Happy to see you again",
      loadingWait: "Wait! The app is the warming up!",
      loadingReady: "Ready to go!",
      refreshBtn: "refresh",
      backTopBtn: "Back to top",
    },
    createPost: {
      heading1: "Something to share?",
      heading2: "Share with the community",
      titlePlaceholder: "Title of your post",
      textPlaceholder: "Text (optional)",
      imgBtn: "Picture",
      changeImgBtn: "Change picture",
      deleteImgBtn: "Delete picture",
      gifBtn: "GIF",
      linkBtn: "Link",
      cancelBtn: "cancel",
      publishBtn: "post",
    },
    commentPage: {
      backLink: "Back to feed",
      noComments: "no comment yet",
      comments: "comments",
      commentForm: {
        commentAs: "Comment as",
        placeholder: "Your comment...",
        commentBtn: "comment",
      },
      comment: {
        reply: "reply",
      },
      replyForm: {
        placeholder: "Your reply...",
        replyBtn: "reply",
      },
    },
    profile: {
      member: "Member for",
      editBtn: "Edit profile",
      usernameBtn: "Change username",
      deleteBtn: "Delete my profile",
      modDeleteBtn: "Delete profile",
      posts: "My posts",
      userPosts: "Posts",
      follow: "follow",
      unfollow: "Unfollow",
      followers: "My followers",
      userFollowers: "Followers",
      following: "I'm following",
      userFollowing: "Following",
      back: "Back to profile",
      myProfile: "Go to my profile",
    },
    editModal: {
      newUsername: "Enter your new username",
      ok: "ok",
      cancel: "cancel",
    },
    deleteModal: {
      msgPost: "Delete this post forever?",
      msgComment: "Delete this comment forever?",
      msgReply: "Delete this reply forever?",
      msgWarning: "Your profile is about to get permanently deleted from Forum.\nAre you sure you want to delete it? ",
      msgModWarning: "This user's account is about to get permanently deleted from Forum.\nDo you want to proceed?",
      cancel: "cancel",
      yes: "yes",
    },
    imgUploader: {
      chooseBtn: "Select your profile pic",
      changePicBtn: "Change profile pic",
      changeBannerBtn: "Change banner image",
      browse: "Browse",
      noPic: "No pic selected yet",
      preview: "Preview",
      ok: "All good!",
      changeBtn: "Change image",
      save: "Save",
      delete: "Delete pic",
    },
    postFooter: {
      comments: "Comments",
    },
    postOptions: {
      modify: "Edit",
      share: "Share",
      delete: "Delete",
      report: "Report",
    },
    preview: {
      linkArticle: "Go to article",
    },
    imgUploadModal: {
      label: "Add a picture",
    },
    gifModal: {
      search: "Find a gif...",
      cancel: "Cancel",
    },
    previewLinkModal: {
      label:
        "Paste the link to any article: Stackoverflow, Huffington Post, The Guardian, NYTtimes, a blog, or any article you want to share...",
      placeholder: "Paste link",
      ok: "ok",
    },
    sessionExpired: {
      expired: "Your session has expired!",
      reconnect: "Please log in",
      here: "here",
    },
    visitorModal: {
      msgPost: "Please create an account to publish a post!",
      msgSelfProfile: "Please create an account to view your profile!",
      msgConnect: "Please sign up to connect to Forum!",
      msgProfiles: "Please sign up to view a member's profile!",
      msgNewMembers: "Please sign up to see the new members!",
      msgMods: "Please sign up to see a mod's profile!",
      msgLike: "Please create an account to like a post!",
      msgComments: "Please sign up to see comments and leave one!",
      msgDeleteProfile: "Nothing to delete, you do not have a profile yet!",
    },
    deletePage: {
      confirmation: "Your account was successfully deleted...",
      missYou: "We're going to miss you.",
      hope: "We hope to see you soon again on ",
      modMsg: "The user's account has been successfully deleted.",
      backBtn: "Back to home",
    },
    pageNotFound: {
      msg: "Page not Found!",
      gif1: "The page you requested doesn't exist, sorry!",
      gif2: "Come back home sweetie!",
    },
  },

  /////////////////
  //  FRANCAIS  //
  ////////////////
  français: {
    options: {
      lang: "langue",
      appearance: "apparence",
      help: "aide",
      subtitleLang: "Vous pourrez naviguer sur FORUM dans la langue de votre choix.",
      subtitleMode: "Ajustez l'interface de Forum à vos préférences: thème sombre ou thème clair.",
    },
    appearance: {
      dark: "sombre",
      light: "clair",
    },
    homepage: {
      introText:
        "Le tout nouveau réseau social fondé sur les principes du partage des connaissances, de la bienveillance et du fun.",
      connectLbl: "déjà membre",
      connectBtn: "se connecter",
      registerLbl: "nouveau sur forum",
      registerBtn: "s'inscrire",
      exploreLbl: "curieux",
      exploreBtn: "explorer forum",
      download: "Téléchargez cette application",
    },
    error: {
      duplicateEmail: "Un compte associé à cet email existe déjà.",
      duplicateUsername: "Ce nom d'utilisateur est déjà pris!\nVeuillez en choisir un autre.",
      nameTooLong: "Ce nom d'utilisateur est trop long!\nVeuillez en choisir un plus court.",
      emptyTitle: "Votre titre est vide!\nMettez un mot ou deux...",
      emptyComment: "Votre commentaire est vide!",
      emptyReply: "Votre réponse est vide!",
      emptyUsername: "Le champ est vide! Entrez votre nouveau nom d'utilisateur.",
      sameUsername: "C'est le même nom d'utilisateur.\nVeuillez entrer un nouveau nom.",
      backend: "Oups! petit problème de notre part, désolé...",
      notFound: "Aucun compte trouvé avec cet email",
      password: "Votre mot de passe est incorrect",
      database: "Oups! On dirait que notre serveur a éternué...\nVeuillez rafraîchir la page ou vous reconnecter",
      scrape:
        "Désolé, une erreur s'est produite en récupérant votre article.\nVeuillez rafraîchir et réessayer ou utilisez un autre lien.",
      noAuthToken: "On dirait que vous n'êtes pas authentifié(e)...\nVeuillez vous reconnecter.",
      verifyAuthToken: "Désolé on a un petit problème avec votre authentification.\nVeuillez vous reconnecter.",
      authToken: "Votre authentification a échoué...\nVeuillez vous reconnecter.",
      timeout: "Oups, la connexion au serveur fait des siennes...\nVeuillez rafraîchir la page ou vous reconnecter",
      sizeLimit: "Cette image est trop lourde! La taille max est 2MB.\nVeuillez choisir une image moins lourde.",
    },
    login: {
      greeting: "content de vous revoir!",
      pass: "Mot de passe",
      enter: "valider",
      first: "Première fois sur FORUM",
      registerBtn: "s'inscrire",
    },
    signup: {
      join: "Rejoignez la communauté!",
      email: "Entrez votre email",
      pass: "Créez un mot de passe",
      checkUpper: "au moins 1 majuscule",
      checkLower: "au moins 1 minuscule",
      checkDigit: "au moins 1 chiffre",
      check8: "au moins 8 caractères",
      submit: "créer mon compte",
      already: "J'ai déjà un compte!",
      alreadyBtn: "Se connecter",
      stepUsername: {
        choose: "Choisissez votre pseudo",
        ok: "valider",
      },
      stepImage: {
        lastStep: "dernière étape avant de\nrejoindre la communauté!",
        later: "Plus tard, pas maintenant!",
      },
    },
    navbar: {
      searchPlaceholder: "Rechercher sur Forum...",
      searchPlaceholderMobile: "Recherche...",
      connected: "Connecté(e)",
      visitor: "mode visiteur",
      logout: "Déconnexion",
    },
    navbarDesktop: {
      publish: "Publier un Post",
      profile: "Mon profil",
      settings: "Paramètres",
      logout: "Déconnexion",
    },
    search: {
      searchBy: "Rechercher par",
      user: "Membre",
      post: "Publication",
      cancel: "annuler",
      msg: "Une recherche sur Forum?\nLa barre de recherche est juste au dessus!",
    },
    menu: {
      visitor: "Pas encore de profil",
      member: "Membre depuis",
      profile: "Mon profil",
      publish: "Publier un Post",
      settings: "Paramètres",
      delete: "Supprimer mon profil",
      status: "Statut : en ligne",
    },
    aside: {
      recentMembers: "Nouveaux membres",
      newMembersBtn: "Voir tous les membres",
      mods: "Modérateur(s)",
      modsContactBtn: "Contacter un modérateur",
      popular: "Posts populaires",
      rules: {
        rules: "Règles sur Forum",
        rule_human: "Souvenez vous de l'être humain.",
        rule_irl: "Comportez-vous comme vous le feriez dans la vraie vie.",
        rule_source: "Cherchez la source originale du contenu.",
        rule_double: "Evitez de publier des doublons.",
        rule_rule: "Respectez les règles de la communauté.",
        rule_msg_1: "Veuillez respecter la",
        rule_msg_2: "politique de contenu",
        rule_msg_3: "de Forum et bien prendre en compte",
        rule_msg_4: "l'esprit Forum",
      },
      footer: {
        help: "Aide",
        coin: "Jetons Forum",
        premium: "Forum Premium",
        gift: "Cadeaux",
        community: "Communautés",
        re: "Re:Forum",
        topic: "Thématiques",
        career: "Carrières",
        press: "Presse",
        ads: "Publicité",
        blog: "Blog",
        conditions: "Conditions",
        content: "Politique de contenu",
        confidentiality: "Politique de confidentialité",
        moderation: "Politique de modération",
        rights: "Tous droits réservés",
        about: "À propos",
        terms: "CGU",
      },
    },
    feed: {
      greetingVisitor: "Bienvenue sur Forum - Bonne visite!",
      greetingVisitor_mob: "Bienvenue sur Forum\nBonne visite!",
      greetingNewUserLine1: "Bienvenue",
      greetingNewUserLine2: "Echangez et discutez avec la communauté!",
      greetingNewUserLine2_mob: "Echangez avec la communauté!",
      greetingUser: "Content de vous revoir",
      loadingWait: "On arrive! Le moteur chauffe!",
      loadingReady: "Tout est prêt!",
      refreshBtn: "rafraîchir",
      backTopBtn: "Revenir en haut",
    },
    createPost: {
      heading1: "Un truc à partager?",
      heading2: "Partage avec la communauté",
      titlePlaceholder: "Titre de votre post",
      textPlaceholder: "Texte (facultatif)",
      imgBtn: "Image",
      changeImgBtn: "Changer l'image",
      deleteImgBtn: "Supprimer l'image",
      gifBtn: "GIF",
      linkBtn: "Lien",
      cancelBtn: "annuler",
      publishBtn: "publier",
    },
    commentPage: {
      backLink: "Retour",
      noComments: "pas encore de commentaire",
      comments: "commentaires",
      commentForm: {
        commentAs: "Commenter en tant que",
        placeholder: "Votre commentaire...",
        commentBtn: "commenter",
      },
      comment: {
        reply: "répondre",
      },
      replyForm: {
        placeholder: "Tapez votre réponse...",
        replyBtn: "répondre",
      },
    },
    profile: {
      member: "Membre depuis",
      editBtn: "Modifier mon profil",
      usernameBtn: "Modifier mon pseudo",
      deleteBtn: "Supprimer mon profil",
      modDeleteBtn: "Supprimer le profil",
      posts: "Mes posts",
      userPosts: "Publications",
      follow: "Suivre",
      unfollow: "Abonné",
      followers: "Mes abonnés",
      userFollowers: "Abonnés",
      following: "Mes abonnements",
      userFollowing: "Abonnements",
      back: "Retout au profil",
      myProfile: "Voir mon profil",
    },
    editModal: {
      newUsername: "Entrez votre nouveau pseudo",
      ok: "valider",
      cancel: "annuler",
    },
    deleteModal: {
      msgPost: "Supprimer ce post définitivement?",
      msgComment: "Supprimer ce commentaire définitivement?",
      msgReply: "Supprimer cette réponse définitivement?",
      msgWarning: "Votre profil est sur le point d'être supprimé définitement de Forum.\nVoulez-vous vraiment l'effacer?",
      msgModWarning: "Le compte de l'utilisateur va être supprimé définitement de Forum.\nConfirmez-vous sa suppression?",
      cancel: "annuler",
      yes: "oui",
    },
    imgUploader: {
      chooseBtn: "Choisir une photo de profil",
      changePicBtn: "Modifier l'image de profil",
      changeBannerBtn: "Modifier la bannière",
      browse: "Parcourir",
      noPic: "Aucune image choisie pour le moment.",
      preview: "Aperçu",
      ok: "C'est bon!",
      changeBtn: "Changer d'image",
      save: "Enregistrer",
      delete: "Supprimer",
    },
    postFooter: {
      comments: "Commentaires",
    },
    postOptions: {
      modify: "Modifier",
      share: "Partager",
      delete: "Supprimer",
      report: "Signaler",
    },
    preview: {
      linkArticle: "Aller voir l'article",
    },
    imgUploadModal: {
      label: "Ajouter une image",
    },
    gifModal: {
      search: "Rechercher un gif...",
      cancel: "Annuler",
    },
    previewLinkModal: {
      label:
        "Ajouter un lien vers un article: Stackoverflow, Le Monde, Le Figaro, Mediapart, un blog, ou tout ce que vous voulez...",
      placeholder: "Coller le lien",
      ok: "valider",
    },
    sessionExpired: {
      expired: "Votre session a expiré!",
      reconnect: "Veuillez vous reconnecter",
      here: "ici",
    },
    visitorModal: {
      msgPost: "Veuillez créer un compte pour publier un post!",
      msgSelfProfile: "Veuillez créer un compte pour voir votre profil!",
      msgConnect: "Veuillez vous inscrire pour vous connecter à Forum!",
      msgProfiles: "Veuillez vous inscrire pour voir le profil des utilisateurs!",
      msgNewMembers: "Veuillez vous inscrire pour voir les nouveaux membres!",
      msgMods: "Veuillez vous inscrire pour voir les modérateurs!",
      msgLike: "Veuillez vous inscrire pour liker les posts des utilisateurs!",
      msgComments: "Veuillez vous inscrire pour voir et laisser des commentaires!",
      msgDeleteProfile: "Rien à supprimer, vous n'avez pas encore de profil sur Forum!",
    },
    deletePage: {
      confirmation: "Votre compte a bien été supprimé...",
      missYou: "Vous allez nous manquer.",
      hope: "Nous espérons vous revoir bientôt sur ",
      modMsg: "Le compte de l'utilisateur a été supprimé de l'application avec succès.",
      backBtn: "Retour à la page accueil",
    },
    pageNotFound: {
      msg: "Page introuvable!",
      gif1: "La page demandée n'existe pas, désolé!",
      gif2: "Reviens petit chaton!",
    },
  },

  ////////////////
  //  DEUTSCH  //
  ///////////////
  deutsch: {
    options: {
      lang: "sprache",
      appearance: "erscheinungsbild",
      help: "hilfe",
      subtitleLang: "Du kannst in der von dir gewählten Sprache durch FORUM navigieren.",
      subtitleMode: "Passe die Benutzeroberfläche des Forums deinen Wünschen an: Dunkel- oder HellModus.",
    },
    appearance: {
      dark: "DunkelModus",
      light: "HellModus",
    },
    homepage: {
      introText:
        "Eine brandneue Social-Media-Plattform, die auf den Grundsätzen des “Teilen ist Kümmern“, der positiven Energie und Spass beruht.",
      connectLbl: "Schon ein Mitglied",
      connectBtn: "sich anmelden",
      registerLbl: "neu auf forum",
      registerBtn: "Konto erstellen",
      exploreLbl: "neugierig",
      exploreBtn: "forum erforschen",
      download: "Hole Sie sich die App",
    },
    error: {
      duplicateEmail: "Ein Konto mit dieser Emailadresse existiert schon.",
      duplicateUsername: "Dieser Benutzername ist schon vergeben!\nGeben Sie bitte einen anderen Benutzernamen ein.",
      nameTooLong: "Dieser Benutzername ist zu lang!\nGeben Sie bitte einen kürzeren Benutzernamen ein.",
      emptyTitle: "Der Beitrag hat keine Überschrift!\nSchreiben Sie ein paar Wörter...",
      emptyComment: "Ihr Kommentar ist doch leer...",
      emptyReply: "Ihre Antwort ist doch leer...",
      emptyUsername: "Kein Benutzername! Gib bitte deinen neuen Benutzernamen ein.",
      sameUsername: "Es ist der gleiche Benutzername.\n Gib bitte deinen neuen Benutzernamen ein.",
      backend:
        "Ach! Sieht aus wie etwas schiefgegangen ist, sorry...\nBitte aktualisieren Sie die Webseite oder melden Sie sich wieder an",
      notFound: "Kein Konto mit dieser Emailadresse gefunden",
      password: "Falsches Passwort eingegeben",
      database:
        "Oops! Sieht aus wie unser Server geniest hat...\nBitte aktualisieren Sie die Webseite oder melden Sie sich wieder an",
      scrape:
        "Sorry aber ein Fehler ist beim Abrufen Ihres Artikels aufgetreten.\nBitte aktualisieren Sie die Webseite oder verwenden Sie einen anderen Link.",
      noAuthToken: "Sieht aus wie Sie nicht authentifiziert sind...\nBitte melden Sie sich wieder an.",
      verifyAuthToken: "Sorry aber es gibt ein kleines Problem mit Ihrer Authentifizierung.\nBitte melden Sie sich wieder an.",
      authToken: "Oops! Ihre Authentifizierung ist fehlgeschlagen.\nBitte melden Sie sich wieder an.",
      timeout: "Sorry, die Verbindungszeit zum Server ist zu lange...\nBitte aktualisieren Sie die Webseite",
      sizeLimit: "Dieses Bild ist zu gross! Max Grösse is 2MB.\nBitte wählen Sie ein leichteres Bild aus.",
      pageNotFound: "Seite nicht gefunden!",
    },
    login: {
      greeting: "Schön dich wieder zu sehen!",
      pass: "Passwort",
      enter: "bestätigen",
      first: "Zum ersten Mal auf FORUM",
      registerBtn: "registrieren",
    },
    signup: {
      join: "Tritt der Community bei!",
      email: "Emailadresse eingeben",
      pass: "Passwort einrichten",
      checkUpper: "mind. 1 Großbuchstabe",
      checkLower: "mind. 1 Kleinbuchstabe",
      checkDigit: "mind. 1 Ziffer",
      check8: "mind. 8 Zeichen",
      submit: "Konto erstellen",
      already: "Ich habe schon ein Konto!",
      alreadyBtn: "Sich anmelden",
      stepUsername: {
        choose: "Benutzername erstellen",
        ok: "ok",
      },
      stepImage: {
        lastStep: "letzter Schritt\nvor dem Beitritt!",
        later: "Später, nicht jetzt!",
      },
    },
    navbar: {
      searchPlaceholder: "Forum durchsuchen...",
      searchPlaceholderMobile: "Suchen...",
      connected: "Angemeldet",
      visitor: "Besuchermodus",
      logout: "Abmelden",
    },
    navbarDesktop: {
      publish: "Beitrag erstellen",
      profile: "Mein Profil",
      settings: "Einstellungen",
      logout: "Abmelden",
    },
    search: {
      searchBy: "Suchen durch",
      user: "Mitglieder",
      post: "Beiträge",
      cancel: "abbrechen",
      msg: "Beim Suchen?\nDie Suchleiste da oben ist dafür da!",
    },
    menu: {
      visitor: "Noch kein Profil",
      member: "Mitglied seit",
      profile: "Mein Profil",
      publish: "Beitrag erstellen",
      settings: "Einstellungen",
      delete: "Mein Profil löschen",
      status: "Status : online",
    },
    aside: {
      recentMembers: "Neue Mitglieder",
      newMembersBtn: "Alle Mitglieder sehen",
      mods: "Moderator(en)",
      modsContactBtn: "Moderator anschreiben",
      popular: "Beliebteste posts",
      rules: {
        rules: "Forums Regeln",
        rule_human: "Wir sind alle Menschen.",
        rule_irl: "Benimm dich wie im richtigen Leben.",
        rule_source: "Finde die ursprüngliche Quelle des Beitrags.",
        rule_double: "Benutze die Suchfunktion bevor du postest.",
        rule_rule: "Lies dir die Communityregeln durch.",
        rule_msg_1: "Bitte achte auf Forums",
        rule_msg_2: "Inhaltsrichtlinie",
        rule_msg_3: "und achte auf",
        rule_msg_4: "Forums spirit",
      },
      footer: {
        help: "Hilfe",
        coin: "Forum Münzen",
        premium: "Forum Premium",
        gift: "Geschenke",
        community: "Communities",
        re: "Re:Forum",
        topic: "Themen",
        career: "Karriere",
        press: "Presse",
        ads: "Auf Forum werben",
        blog: "Blog",
        conditions: "AGB",
        content: "Inhaltsrichtlinien",
        confidentiality: "Datenschutz",
        moderation: "Moderationsrichtslinien",
        rights: "Alle Rechte vorbehalten",
        about: "Über",
        terms: "AGB",
      },
    },
    feed: {
      greetingVisitor: "Wilkommen auf Forum - Viel Spaß bei den Rundgang!",
      greetingVisitor_mob: "Wilkommen auf Forum\nViel Spaß bei den Rundgang!",
      greetingNewUserLine1: "Wilkommen",
      greetingNewUserLine2: "Teile und diskutiere mit der Community!",
      greetingNewUserLine2_mob: "Teile mit der Community!",
      greetingUser: "Schön dich wiederzusehen",
      loadingWait: "Bitte warten! Es ist die Erwärmung!",
      loadingReady: "Alles fertig!",
      refreshBtn: "aktualisieren",
      backTopBtn: "Zurück nach oben",
    },
    createPost: {
      heading1: "Etwas zu teilen?",
      heading2: "Teile mit der Community",
      titlePlaceholder: "Überschrift",
      textPlaceholder: "Text (optional)",
      imgBtn: "Bild",
      changeImgBtn: "Bild wechseln",
      deleteImgBtn: "Bild löschen",
      gifBtn: "GIF",
      linkBtn: "Link",
      cancelBtn: "abbrechen",
      publishBtn: "posten",
    },
    commentPage: {
      backLink: "Zurück",
      noComments: "noch kein kommentar",
      comments: "kommentare",
      commentForm: {
        commentAs: "Kommentiere als",
        placeholder: "Was denkst du dazu?",
        commentBtn: "kommentieren",
      },
      comment: {
        reply: "antworten",
      },
      replyForm: {
        placeholder: "Deine Antwort...",
        replyBtn: "antworten",
      },
    },
    profile: {
      member: "Mitglied seit",
      editBtn: "Profil bearbeiten",
      usernameBtn: "Benutzername ändern",
      deleteBtn: "Mein Profil löschen",
      modDeleteBtn: "Profil löschen",
      posts: "Meine Posts",
      userPosts: "Beiträge",
      follow: "Folgen",
      unfollow: "Folge ich",
      followers: "Meine Follower",
      userFollowers: "Follower",
      following: "Folge ich",
      userFollowing: "Folge ich",
      back: "Zurück zum Profil",
      myProfile: "Zu meinem Profil",
    },
    editModal: {
      newUsername: "Gib dein neuen Benutzername ein",
      ok: "ok",
      cancel: "abbrechen",
    },
    deleteModal: {
      msgPost: "Beitrag für immer entfernen?",
      msgComment: "Kommentar für immer entfernen?",
      msgReply: "Antwort für immer entfernen?",
      msgWarning: "Ihr Profil wird für immer gelöscht.\nWollen Sie bestätigen?",
      msgModWarning: "Das Benutzerkonto wird für immer gelöscht.\nBestätigen Sie?",
      cancel: "abbrechen",
      yes: "ja",
    },
    imgUploader: {
      chooseBtn: "Profilbild einrichten",
      changePicBtn: "Profilbild ändern",
      changeBannerBtn: "Bannerbild ändern",
      browse: "Durchsuchen",
      noPic: "Kein Bild ausgewählt.",
      preview: "Vorschau",
      ok: "Alles gut!",
      changeBtn: "Bild wechseln",
      save: "Speichern",
      delete: "Löschen",
    },
    postFooter: {
      comments: "Kommentare",
    },
    postOptions: {
      modify: "Bearbeiten",
      share: "Teilen",
      delete: "Löschen",
      report: "Melden",
    },
    preview: {
      linkArticle: "Zum artikel",
    },
    imgUploadModal: {
      label: "Bild hinfügen",
    },
    gifModal: {
      search: "Gif suchen...",
      cancel: "Abbrechen",
    },
    previewLinkModal: {
      label:
        "Linke zu einem Artikel einfügen: stackoverflow, huffingtonpost, der Spiegel, SDZ, ein Blog, oder irgendwelcher Artikel Sie teilen wollen...",
      placeholder: "Link einfügen",
      ok: "ok",
    },
    sessionExpired: {
      expired: "Deine Sitzung ist abgelaufen!",
      reconnect: "Bitte meld dich erneut an",
      here: "hier",
    },
    visitorModal: {
      msgPost: "Bitte erstelle ein Konto, um Beiträge zu posten!",
      msgSelfProfile: "Bitte erstelle ein Konto, um Ihr Profil anzusehen!",
      msgConnect: "Bitte registriere, um sich auf Forum anzumelden",
      msgProfiles: "Bitte registriere, um sich die Mitgliederprofile anzuschauen!",
      msgNewMembers: "Bitten registriere, um die neue Mitglieder zu sehen!",
      msgMods: "Bitten registriere, um die Moderator*innen zu sehen!",
      msgLike: "Bitten registriere, um Beiträge zu liken!",
      msgComments: "Bitte erstelle ein Konto, um Kommentare sehen und schreiben zu können!",
      msgDeleteProfile: "Gibt nichts zu löschen, da Du noch kein Profil bei Forum hast!",
    },
    deletePage: {
      confirmation: "Dein Konto wurde erfolgreich gelöscht...",
      missYou: "Wir werden dich vermissen.",
      hope: "Wir hoffen dich bald bei ",
      modMsg: "Der Benutzer wurde vom Forum erfolgreich gelöscht.",
      backBtn: "Zurück",
    },
    pageNotFound: {
      msg: "Seite nicht gefunden!",
      gif1: "Die von Ihnen angefragte Seite existiert nicht, sorry!",
      gif2: "Komm zurück Schatzi!",
    },
  },
};
export default language;
