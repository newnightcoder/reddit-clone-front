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
      introText:
        "A brand new social media platform founded on the principles of free speech, independent thought and rejecting political censorship and “cancel culture.”",
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
      emptyTitle: "Your post has no title!\n Put a word or two...",
      emptyComment: "Your comment is empty...",
      emptyReply: "Your reply is empty...",
      backend: "Oops! something went wrong...",
      notFound: "No user found with this email address",
      password: "Your password is incorrect",
      database: "Sorry! Looks like our server just sneezed...\nPlease refresh the page",
      scrape:
        "Weird... Something funny happened while getting this article.\nPlease refresh and try again or choose another article.",
      noAuthToken: "Looks like you're not authenticated...\nPlease log in again.",
      verifyAuthToken: "Sorry we're not able to authenticate you for some reason.\nPlease log in again.",
      authToken: "Sorry but your authentication went wrong for some reason.Please log in again.",
    },
    login: {
      greeting: "happy to see you again on",
      pass: "Password",
      enter: "log in",
      first: "First time on FORUM",
      registerBtn: "sign up",
    },
    signup: {
      join: "Join the community",
      email: "Enter your email",
      pass: "Create your password",
      checkUpper: "contains at least 1 uppercase letter",
      checkLower: "contains at least 1 lowercase letter",
      checkDigit: "contains at least 1 digit",
      check8: "contains at least 8 characters",
      submit: "create my account",
      already: "I already have an account!",
      alreadyBtn: "Log in",
      stepUsername: {
        choose: "Choose your username:",
        ok: "ok",
      },
      stepImage: {
        lastStep: "Last step before",
        join: "joining the community",
        later: "Later, not now!",
      },
    },
    navbar: {
      searchPlaceholder: "Search on Forum...",
      connected: "Logged in",
      visitor: "Visitor mode",
      logout: "log out",
    },
    navbarDesktop: {
      publish: "Write a post",
      profile: "My profile",
      settings: "Settings",
      logout: "Logout",
      member: "Member for",
      visitor: "Visitor mode",
      status: "Status : online",
      delete: "Delete my profile",
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
      },
    },
    feed: {
      greetingVisitorMode: "Welcome to Forum - Take a look around",
      greetingVisitor1: "Welcome to Forum",
      greetingVisitor2: "Share and discuss with the community.",
      greetingUser: "Happy to see you again",
      refreshBtn: "refresh",
    },
    createPost: {
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
      noComments: "no comment yet",
      comments: "comments",
      commentForm: {
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
      usernameBtn: "Change username",
      deleteBtn: "Delete my profile",
      modDeleteBtn: "Delete profile",
      posts: "My posts",
      userPosts: "Posts",
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
      msgWarning: "Your profile is about to get permanently deleted from Forum.\n Are you sure you want to delete it? ",
      msgModWarning: "This user's account is about to get permanently deleted from Forum.\n Do you want to proceed?",
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
        "Une toute nouvelle plate-forme de média sociaux basée sur les principes de la liberté d'expression, de la pensée indépendante, du rejet de la censure politique et de la “cancel culture”.",
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
      emptyTitle: "Votre titre est vide!\n Mettez un mot ou deux...",
      emptyComment: "Votre commentaire est vide!",
      emptyReply: "Votre réponse est vide!",
      backend: "Oups! petit problème de notre part, désolé...",
      notFound: "Aucun compte trouvé avec cet email",
      password: "Votre mot de passe est incorrect",
      database: "On dirait que notre serveur vient d'éternuer...\nVeuillez rafraîchir la page",
      scrape:
        "Bizarre... Une erreur s'est produite en allant chercher votre article.\nVeuillez rafraîchir et réessayer ou utilisez un autre lien.",
      noAuthToken: "On dirait que vous n'êtes pas authentifié(e)...\nVeuillez vous reconnecter.",
      verifyAuthToken: "Désolé on a un petit problème avec votre authentification.\nVeuillez vous reconnecter.",
      authToken: "Oups! Votre authentification a échoué...\nVeuillez vous reconnecter.",
    },
    login: {
      greeting: "content de vous revoir sur",
      pass: "Mot de passe",
      enter: "valider",
      first: "Première fois sur FORUM",
      registerBtn: "s'inscrire",
    },
    signup: {
      join: "Rejoignez la communauté",
      email: "Entrez votre email",
      pass: "Créez un mot de passe",
      checkUpper: "contient au moins 1 majuscule",
      checkLower: "contient au moins 1 minuscule",
      checkDigit: "contient au moins 1 chiffre",
      check8: "contient au moins 8 caractères",
      submit: "valider",
      already: "J'ai déjà un compte!",
      alreadyBtn: "Se connecter",
      stepUsername: {
        choose: "Choisissez votre pseudo:",
        ok: "valider",
      },
      stepImage: {
        lastStep: "dernière étape avant de",
        join: "rejoindre la communauté",
        later: "Plus tard, pas maintenant!",
      },
    },
    navbar: {
      searchPlaceholder: "Rechercher sur Forum...",
      connected: "Connecté(e)",
      visitor: "mode visiteur",
      logout: "Déconnexion",
    },
    navbarDesktop: {
      publish: "Publier un Post",
      profile: "Mon profil",
      settings: "Paramètres",
      logout: "Déconnexion",
      member: "Membre depuis",
      visitor: "Mode visiteur",
      status: "Statut : en ligne",
      delete: "Supprimer mon profil",
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
      },
    },
    feed: {
      greetingVisitorMode: "Bienvenue sur le fil du Forum, visiteur!",
      greetingVisitor1: "Bienvenue sur Forum",
      greetingVisitor2: "Echangez et discutez avec la communauté.",
      greetingUser: "Content de vous revoir",
      refreshBtn: "rafraîchir",
    },
    createPost: {
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
      noComments: "pas encore de commentaire",
      comments: "commentaires",
      commentForm: {
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
      usernameBtn: "Modifier mon pseudo",
      deleteBtn: "Supprimer mon profil",
      modDeleteBtn: "Supprimer le profil",
      posts: "Mes posts",
      userPosts: "Publications",
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
      msgWarning: "Votre profil est sur le point d'être supprimé définitement de Forum.\n Voulez-vous vraiment l'effacer?",
      msgModWarning: "Le compte de l'utilisateur va être supprimé définitement de Forum.\n Confirmez-vous sa suppression?",
      cancel: "annuler",
      yes: "oui",
    },
    imgUploader: {
      chooseBtn: "Choisissez votre image de profil",
      changePicBtn: "Modifier l'image de profil",
      changeBannerBtn: "Modifier la bannière",
      browse: "Parcourir",
      noPic: "Aucune image choisie pour le moment.",
      preview: "Aperçu",
      ok: "C'est bon!",
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
        "Eine brandneue Social-Media-Plattform, die auf den Grundsätzen der freien Meinungsäußerung, des unabhängigen Denkens und der Ablehnung von politischer Zensur sowie “Löschkultur” beruht.",
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
      emptyTitle: "Der Beitrag hat keine Überschrift!\n Schreiben Sie ein paar Wörter...",
      emptyComment: "Ihr Kommentar ist doch leer...",
      emptyReply: "Ihre Antwort ist doch leer...",
      backend: "Oops! sieht aus, wie etwas shiefgegangen ist, sorry",
      notFound: "Kein Konto mit dieser Emailadresse gefunden",
      password: "Falsches Passwort eingegeben",
      database: "On dirait que notre serveur vient d'éternuer...\nVeuillez rafraîchir la page",
      scrape:
        "Bizarre... Une erreur s'est produite en allant chercher votre article.\nVeuillez rafraîchir et réessayer ou utilisez un autre lien.",
      noAuthToken: "On dirait que vous n'êtes pas authentifié(e)...\nVeuillez vous reconnecter.",
      verifyAuthToken: "Désolé on a un petit problème avec votre authentification.\nVeuillez vous reconnecter.",
      authToken: "Oups! Votre authentification a échoué...\nVeuillez vous reconnecter.",
    },
    login: {
      greeting: "Schön dich wieder zu sehen auf",
      pass: "Passwort",
      enter: "bestätigen",
      first: "Zum ersten Mal auf FORUM",
      registerBtn: "registrieren",
    },
    signup: {
      join: "Tritt der Community bei",
      email: "Emailadresse eingeben",
      pass: "Passwort einrichten",
      checkUpper: "enthält mindestens 1 Grossbuchstabe",
      checkLower: "enthält mindestens 1 Kleinbuchstabe",
      checkDigit: "enthält mindestens 1 Ziffer",
      check8: "enthält mindestens 8 Zeichen",
      submit: "Konto erstellen",
      already: "Ich habe schon ein Konto!",
      alreadyBtn: "Sich anmelden",
      stepUsername: {
        choose: "Benutzername erstellen",
        ok: "ok",
      },
      stepImage: {
        lastStep: "letzter Schritt",
        join: "vor dem Beitritt",
        later: "Später, nicht jetzt!",
      },
    },
    navbar: {
      searchPlaceholder: "Forum durchsuchen...",
      connected: "Angemeldet",
      visitor: "Besuchermodus",
      logout: "abmelden",
    },
    navbarDesktop: {
      publish: "Beitrag schreiben",
      profile: "Mein Profil",
      settings: "Einstellungen",
      logout: "Abmelden",
      member: "Mitglied seit",
      visitor: "Besuchermodus",
      status: "Status : online",
      delete: "Mein Profil löschen",
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
      },
    },
    feed: {
      greetingVisitorMode: "Wilkommen auf Forum!\nViel spass bei den Rundgang",
      greetingVisitor1: "Wilkommen auf Forum",
      greetingVisitor2: "Teile und diskutiere mit der Community",
      greetingUser: "Schön Sie wiederzusehen",
      refreshBtn: "aktualisieren",
    },
    createPost: {
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
      noComments: "noch kein kommentar",
      comments: "kommentare",
      commentForm: {
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
      usernameBtn: "Benutzername ändern",
      deleteBtn: "Mein Profil löschen",
      modDeleteBtn: "Profil löschen",
      posts: "Meine Posts",
      userPosts: "Beiträge",
    },
    editModal: {
      newUsername: "Geben Sie Ihre neue Benutzername ein",
      ok: "ok",
      cancel: "abbrechen",
    },
    deleteModal: {
      msgPost: "Beitrag für immer entfernen?",
      msgComment: "Kommentar für immer entfernen?",
      msgReply: "Antwort für immer entfernen?",
      msgWarning: "Ihr Profil wird für immer gelöscht.\n Wollen Sie bestätigen?",
      msgModWarning: "Das Benutzerkonto wird für immer gelöscht.\n Bestätigen Sie?",
      cancel: "abbrechen",
      yes: "ja",
    },
    imgUploader: {
      chooseBtn: "Profilbild ",
      changePicBtn: "Profilbild ändern",
      changeBannerBtn: "Bannerbild ändern",
      browse: "Durchsuchen",
      noPic: "Kein Bild ausgewählt.",
      preview: "Vorschau",
      ok: "Alles gut!",
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
        "Link zu einem Artikel einfügen: stackoverflow, huffingtonpost, der Spiegel, SDZ, ein Blog, oder irgendwelcher Artikel Sie teilen wollen...",
      placeholder: "Link einfügen",
      ok: "ok",
    },
    sessionExpired: {
      expired: "Deine Sitzung ist abgelaufen!",
      reconnect: "Bitte meld dich erneut an",
      here: "hier",
    },
    visitorModal: {
      msgPost: "Bitte erstellen Sie ein Konto, um Beiträge zu posten!",
      msgSelfProfile: "Bitte erstellen Sie ein Konto, um Ihr Profil anzusehen!",
      msgConnect: "Bitte registrieren Sie, um sich auf Forum anzumelden",
      msgProfiles: "Bitte registrieren Sie, um sich die Mitgliederprofile anzuschauen!",
      msgNewMembers: "Bitten registrieren Sie, um die neue Mitglieder zu sehen!",
      msgMods: "Bitten registrieren Sie, um die Moderator*innen zu sehen!",
      msgLike: "Bitten registrieren Sie, um Beiträge zu liken!",
      msgComments: "Bitte erstellen Sie ein Konto, um Kommentare sehen und schreiben zu können!",
      msgDeleteProfile: "Gibt nichts zu löschen, da Sie noch kein Profil bei Forum haben!",
    },
    deletePage: {
      confirmation: "Ihr Konto wurde erfolgreich gelöscht...",
      missYou: "Wir werden Sie vermissen.",
      hope: "Wir hoffen Sie bald bei ",
      modMsg: "Der Benutzer wurde vom Forum erfolgreich gelöscht.",
      backBtn: "Zurück",
    },
  },
};
export default language;
