window.caravelRules = {
  "année": 2022,
  "période": "oui",
  "période . jours ouvrés moyen par mois": {
    "formule": "21 jour ouvré/mois",
    "note": "On retient 21 comme nombre de jours ouvrés moyen par mois"
  },
  "période . semaines par mois": {
    "unité": "semaines/mois",
    "formule": "52 semaines/an / 12 mois/an"
  },
  "période . début d'année": {
    "variations": [
      {
        "si": "année = 2022",
        "alors": "01/01/2022"
      },
      {
        "si": "année = 2021",
        "alors": "01/01/2021"
      }
    ]
  },
  "période . fin d'année": {
    "variations": [
      {
        "si": "année = 2022",
        "alors": "31/12/2022"
      },
      {
        "si": "année = 2021",
        "alors": "31/12/2021"
      }
    ]
  },
  "plafond sécurité sociale temps plein": {
    "description": "Le plafond de Sécurité sociale est le montant maximum des rémunérations à prendre en compte pour le calcul de certaines cotisations.",
    "acronyme": "PSS",
    "formule": "3428 €/mois",
    "références": {
      "Urssaf.fr": "https://www.urssaf.fr/portail/home/taux-et-baremes/plafonds.html",
      "arrêté 2021": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042748904"
    },
    "note": "Le plafond de la Sécurité sociale n'a pas été revalorisé en 2021 par rapport à 2020."
  },
  "plafond horaire sécurité sociale": {
    "acronyme": "PHSS",
    "formule": {
      "valeur": "plafond sécurité sociale temps plein / 1607 heures/an",
      "arrondi": "oui"
    },
    "unité": "€/heure",
    "références": {
      "Article D242-19 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000033516173&cidTexte=LEGITEXT000006073189"
    }
  },
  "plafond journalier sécurité sociale": {
    "acronyme": "PJSS",
    "formule": {
      "valeur": "plafond sécurité sociale temps plein / 218 jours/an",
      "arrondi": "oui"
    },
    "unité": "€/jour",
    "références": {
      "Article D242-17 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006073189&idArticle=LEGIARTI000006736124"
    }
  },
  "SMIC horaire": {
    "formule": {
      "variations": [
        {
          "si": "établissement . localisation . département = 'Mayotte'",
          "alors": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "7.98 €/heure"
              },
              {
                "si": "année = 2021",
                "alors": "7.91 €/heure"
              }
            ]
          }
        },
        {
          "sinon": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "10.57 €/heure"
              },
              {
                "si": "année = 2021",
                "alors": "10.48 €/heure"
              }
            ]
          }
        }
      ]
    },
    "note": "En principe et sauf « coup de pouce », le SMIC est revalorisé au 1er janvier\nde chaque année. Toutefois une revalorisation doit intervenir en cours\nd'année si l'indice des prix de référence a augmenté de 2% ou plus depuis la\ndernière revalorisation du SMIC.\n",
    "références": {
      "décret": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044126026",
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F2300"
    }
  },
  "SMIC temps plein": {
    "unité": "€/mois",
    "formule": {
      "produit": {
        "assiette": "contrat salarié . temps de travail . base légale * période . semaines par mois",
        "facteur": "SMIC horaire"
      }
    },
    "références": {
      "décret": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042677359?r=s75zUOEVpR"
    }
  },
  "SMIC temps plein . net imposable": {
    "titre": "SMIC net imposable",
    "description": "Montant du SMIC net imposable pour un temps plein.",
    "formule": {
      "recalcul": {
        "règle": "contrat salarié . rémunération . net imposable . base",
        "avec": {
          "contrat salarié . rémunération . brut de base": "SMIC temps plein"
        }
      }
    },
    "références": {
      "barème PAS": "https://bofip.impots.gouv.fr/bofip/11255-PGP.html"
    }
  },
  "bénéficiaire": {
    "valeur": "non",
    "description": "Un bénéficiaire est un actionnaire dans une SAS ou un associé dans une\nSARL/EURL.\n\nAttention: nous ne prenons en compte ici que le cas de figure de l'associé\n  unique (SASU et EURL).\n"
  },
  "bénéficiaire . compte courant d'associé": {
    "par défaut": "0€",
    "titre": "Sommes versées en compte courant d'associé",
    "question": "Quelles sont les sommes versées en compte courant par l'associé ?",
    "description": "Cette valeur est nécessaire à calculer le montant maximal imposable au PFU pour un bénéficiaire au régime des travailleurs indépendants.\nLe montant pris en compte est le solde moyen annuel du compte courant. Il est déterminé par la somme des soldes moyens mensuels du compte, divisée par le nombre de mois compris dans l’exercice.\nLe solde moyen mensuel est égal à l’addition des soldes journaliers, divisée par le nombre de jours dans le mois. Le solde moyen mensuel diffère donc du solde mensuel figurant dans les comptes de la société.\nEn cas d’ouverture ou de clôture du compte en cours d’exercice, le nombre de mois au cours de l’exercice sera réduit au nombre de mois de fonctionnement du compte. Un compte est considéré comme « fonctionnant », même s’il n’est pas mouvementé au cours de l’exercice.  La date à laquelle les sommes versées en compte courant doivent être appréciées est le dernier jour de l’exercice précédant le versement des intérêts.\n",
    "références": {
      "Circulaire RSI C2014-001": "https://www.secu-independants.fr/uploads/tx_rsirss/C2014-001.pdf"
    }
  },
  "bénéficiaire . dividendes": {
    "valeur": "oui",
    "applicable si": "entreprise . imposition = 'IS'"
  },
  "bénéficiaire . dividendes . bruts": {
    "unité": "€/an",
    "par défaut": "0 €/an",
    "inversion numérique": {
      "avec": [
        "nets d'impôt"
      ]
    },
    "titre": "Dividendes bruts versés"
  },
  "bénéficiaire . dividendes . nets": {
    "somme": [
      "bruts",
      "(- cotisations et contributions)"
    ],
    "titre": "Dividendes nets"
  },
  "bénéficiaire . dividendes . nets d'impôt": {
    "valeur": {
      "somme": [
        "bruts",
        "(- dividendes . cotisations et contributions)",
        "(- impôt . dividendes . montant en sus des autres revenus imposables)"
      ]
    },
    "titre": "Dividendes nets",
    "résumé": "Après paiements des cotisations et impôts"
  },
  "bénéficiaire . dividendes . cotisations et contributions": {
    "produit": {
      "assiette": "bruts",
      "composantes": [
        {
          "attributs": {
            "nom": "CSG non déductible"
          },
          "taux": {
            "variations": [
              {
                "si": "impôt . méthode de calcul . PFU",
                "alors": "9.2%"
              },
              {
                "sinon": "2.4%"
              }
            ]
          }
        },
        {
          "attributs": {
            "nom": "CSG déductible"
          },
          "taux": {
            "variations": [
              {
                "si": "impôt . méthode de calcul . PFU",
                "alors": "0%"
              },
              {
                "sinon": "6.8%"
              }
            ]
          }
        },
        {
          "attributs": {
            "nom": "CRDS"
          },
          "taux": "0.5%"
        },
        {
          "attributs": {
            "nom": "prélèvement de solidarité"
          },
          "taux": "7.5%"
        }
      ]
    },
    "titre": "Cotisations et contributions sur dividendes",
    "note": "La CSG sur les revenus soumis au PFU n'est jamais déductible",
    "références": {
      "Fiche impots.gouv.fr": "https://www.impots.gouv.fr/portail/particulier/les-revenus-mobiliers",
      "Fiche service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F2329",
      "Article L 136-6 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006173130/",
      "Article L 136-7 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006173129/"
    }
  },
  "bénéficiaire . dividendes . imposables": {
    "somme": [
      "bruts",
      "(- cotisations et contributions . CSG déductible)"
    ],
    "abattement": "40%",
    "titre": "Net imposable des dividendes auxquels s'applique le barème de l'impôt sur le revenu",
    "description": "Un abattement de 40% s'applique dans le cas où\n\n- la société distributrice des dividendes relève de l'IS\n- la société distributrice est française ou a son siège en UE ou dans un\n  état ayant conclu des accords en ce sens avec la France\n- les dividendes sont décidés en assemblée générale.\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963"
    }
  },
  "bénéficiaire . dividendes . cotisations et contributions . assiette forfaitaire": {
    "variations": [
      {
        "si": "dirigeant = 'indépendant'",
        "alors": {
          "valeur": "bruts",
          "plafond": "assiette forfaitaire max indépendant"
        }
      },
      {
        "sinon": "bruts"
      }
    ],
    "unité": "€/an",
    "titre": "Assiette des dividendes soumis aux cotisations et contributions au PFU (ou \"flat tax\")",
    "description": "Ce calcul extrait l'assiette des dividendes qui sont soumis au PFU en termes\nde cotisations et contributions.\n",
    "références": {
      "Article L131-6 du Code de la Sécurité Sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000033714224/",
      "Fiche URSSAF": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/la-declaration-sociale-et-fiscal/les-revenus-pris-en-compte-pour.html"
    }
  },
  "bénéficiaire . dividendes . cotisations et contributions . assiette forfaitaire max indépendant": {
    "produit": {
      "assiette": {
        "somme": [
          "entreprise . capital social",
          "compte courant d'associé"
        ]
      },
      "taux": "10%"
    },
    "unité": "€/an"
  },
  "bénéficiaire . dividendes . cotisations et contributions . assiette régime indépendant": {
    "valeur": "bruts - assiette forfaitaire",
    "par défaut": "0 €/an",
    "unité": "€/an",
    "titre": "Assiette des dividendes soumis aux cotisations et contributions du régime indépendant",
    "description": "Cette assiette représente la partie des dividendes qui n'est pas soumise au\nprélèvements sociaux forfaitaires mais aux cotisations et contributions du\nrégime du travailleur indépendant.\n",
    "références": {
      "Fiche URSSAF": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/la-declaration-sociale-et-fiscal/les-revenus-pris-en-compte-pour.html"
    }
  },
  "contrat salarié . convention collective . BTP": {
    "formule": "convention collective = 'BTP'",
    "titre": "Bâtiment",
    "icônes": "👷‍♀️",
    "description": "L'entreprise dépend de la convention collective nationale du bâtiment. Cette convention définit trois catégories de salariés : les ouvriers, les ETAM (employés, techniciens et agents de maîtrise) et les cadres.",
    "rend non applicable": "CDD . indemnité compensatrice de congés payés"
  },
  "contrat salarié . convention collective . BTP . catégorie": {
    "question": "À quelle catégorie la salarié appartient-t'il ?",
    "par défaut": "'ouvrier'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "ouvrier",
          "etam",
          "cadre"
        ]
      }
    }
  },
  "contrat salarié . convention collective . BTP . catégorie . ouvrier": {
    "titre": "Ouvrier",
    "icônes": "👨‍🔧",
    "formule": "catégorie = 'ouvrier'"
  },
  "contrat salarié . convention collective . BTP . catégorie . ouvrier . prévoyance complémentaire": {
    "produit": {
      "assiette": "rémunération . brut de base",
      "plafond": "3 * plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "prévoyance . employeur"
          },
          "taux": "1.72%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "prévoyance . salarié"
          },
          "taux": "0.87%"
        }
      ]
    }
  },
  "contrat salarié . convention collective . BTP . catégorie . etam": {
    "titre": "ETAM",
    "description": "Employé, technicien, angent de maîtrise",
    "icônes": "👷‍♂️",
    "formule": "catégorie = 'etam'",
    "remplace": [
      {
        "règle": "retraite complémentaire . employeur . taux tranche 1",
        "par": "4.47%"
      },
      {
        "règle": "retraite complémentaire . employeur . taux tranche 2",
        "par": "12.70%"
      },
      {
        "règle": "retraite complémentaire . salarié . taux tranche 1",
        "par": "3.40%"
      },
      {
        "règle": "retraite complémentaire . salarié . taux tranche 2",
        "par": "8.89%"
      }
    ],
    "note": "Répartition conventionnelle fixée par l’article 5 de l’Accord du BTP du 13 décembre 1990."
  },
  "contrat salarié . convention collective . BTP . catégorie . etam . prévoyance complémentaire": {
    "produit": {
      "assiette": "rémunération . brut de base",
      "plafond": "3 * plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "prévoyance . employeur"
          },
          "taux": "1.25%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "prévoyance . salarié"
          },
          "taux": "0.60%"
        }
      ]
    }
  },
  "contrat salarié . convention collective . BTP . catégorie . cadre": {
    "formule": "catégorie = 'cadre'",
    "titre": "Cadre",
    "icônes": "👩‍💼",
    "remplace": [
      {
        "règle": "statut cadre",
        "par": "oui"
      }
    ]
  },
  "contrat salarié . convention collective . BTP . catégorie . cadre . prévoyance complémentaire": {
    "barème": {
      "assiette": "rémunération . brut de base",
      "multiplicateur": "plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "prévoyance . employeur"
          },
          "tranches": [
            {
              "taux": "1.50%",
              "plafond": 1
            },
            {
              "taux": "50% * 2.40%",
              "plafond": 4
            },
            {
              "taux": "50% * 3.60%",
              "plafond": 8
            }
          ]
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "prévoyance . salarié"
          },
          "tranches": [
            {
              "taux": "0%",
              "plafond": 1
            },
            {
              "taux": "50% * 2.40%",
              "plafond": 4
            },
            {
              "taux": "50% * 3.60%",
              "plafond": 8
            }
          ]
        }
      ]
    }
  },
  "contrat salarié . convention collective . BTP . cotisations conventionnelles": {
    "remplace": "cotisations . patronales . conventionnelles",
    "formule": {
      "somme": [
        "congés intempéries",
        "OPPBTP"
      ]
    }
  },
  "contrat salarié . convention collective . BTP . congés intempéries": {
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": {
          "variations": [
            {
              "si": "caisse de rattachement = 'idf'",
              "alors": "19.80%"
            },
            {
              "si": "caisse de rattachement = 'nord ouest'",
              "alors": "19.95%"
            },
            {
              "si": "caisse de rattachement = 'grand ouest'",
              "alors": "19.95%"
            },
            {
              "si": "caisse de rattachement = 'centre ouest'",
              "alors": "20.30%"
            },
            {
              "si": "caisse de rattachement = 'centre'",
              "alors": "20.40%"
            },
            {
              "si": "caisse de rattachement = 'grand est'",
              "alors": "20.00%"
            },
            {
              "si": "caisse de rattachement = 'rhône alpes auvergne'",
              "alors": "19.80%"
            },
            {
              "si": "caisse de rattachement = 'méditerranée'",
              "alors": "19.60%"
            },
            {
              "si": "caisse de rattachement = 'sud ouest'",
              "alors": "19.90%"
            }
          ]
        }
      }
    },
    "références": {
      "CIBTP": "https://www.cibtp.fr/",
      "Article L3141-30 du Code du Travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=DF6E6424807679A6EDC2915496BEA32D.tplgfr22s_2?idArticle=LEGIARTI000033020675&cidTexte=LEGITEXT000006072050&dateTexte=20200320"
    }
  },
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement": {
    "question": "À quelle caisse l'entreprise est-elle rattachée pour le versement de la cotisation congés intempéries ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "idf",
          "nord ouest",
          "grand ouest",
          "centre ouest",
          "centre",
          "grand est",
          "rhône alpes auvergne",
          "méditerranée",
          "sud ouest"
        ]
      }
    },
    "par défaut": "'idf'"
  },
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . idf": {
    "titre": "Île-de-France"
  },
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . nord ouest": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . grand ouest": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . centre ouest": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . centre": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . grand est": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . rhône alpes auvergne": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . méditerranée": null,
  "contrat salarié . convention collective . BTP . congés intempéries . caisse de rattachement . sud ouest": null,
  "contrat salarié . convention collective . BTP . OPPBTP": {
    "formule": {
      "produit": {
        "assiette": "rémunération . brut de base * 1.1314",
        "taux": "0.11%"
      }
    }
  },
  "contrat salarié . convention collective . compta": {
    "formule": "convention collective = 'compta'",
    "titre": "Experts-comptables et commissaires aux comptes",
    "icônes": "🧮",
    "description": "Cette convention collective concerne les experts comptables inscrits à l'ordre, les commissaires aux comptes inscrits à la compagnie, ainsi que les centres de gestion agréés et les associations agréées (AGC).",
    "références": {
      "Légifrance": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635826",
      "Synthèse Dicotravail": "https://www.dicotravail.com/convention-collective/experts-comptables-jo-3020-idcc-787/"
    }
  },
  "contrat salarié . convention collective . compta . majoration heures supplémentaires": {
    "remplace": "temps de travail . heures supplémentaires . majoration",
    "formule": {
      "barème": {
        "assiette": "temps de travail . heures supplémentaires",
        "multiplicateur": "période . semaines par mois",
        "tranches": [
          {
            "taux": "10%",
            "plafond": "4 heures/semaine"
          },
          {
            "taux": "25%"
          }
        ]
      }
    }
  },
  "contrat salarié . convention collective . HCR": {
    "formule": "convention collective = 'HCR'",
    "titre": "hôtels, cafés restaurants HCR",
    "icônes": "🍴",
    "description": "L'entreprise est un hôtel, café, restaurant ou assimilé."
  },
  "contrat salarié . convention collective . HCR . montant forfaitaire d'un repas": {
    "remplace": {
      "règle": "rémunération . avantages en nature . nourriture . montant . repas forfaitaire"
    },
    "formule": "3.62 €/repas"
  },
  "contrat salarié . convention collective . HCR . majoration heures supplémentaires": {
    "remplace": "temps de travail . heures supplémentaires . majoration",
    "formule": {
      "barème": {
        "assiette": "temps de travail . heures supplémentaires",
        "multiplicateur": "période . semaines par mois",
        "tranches": [
          {
            "taux": "10%",
            "plafond": "4 heures/semaine"
          },
          {
            "taux": "20%",
            "plafond": "8 heures/semaine"
          },
          {
            "taux": "50%"
          }
        ]
      }
    }
  },
  "contrat salarié . convention collective . HCR . prévoyance conventionnelle": {
    "produit": {
      "assiette": "rémunération . brut de base",
      "plafond": "plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "prévoyance . employeur"
          },
          "taux": "0.40%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "prévoyance . salarié"
          },
          "taux": "0.40%"
        }
      ]
    },
    "références": {
      "Prévoyance HCR": "https://www.hcrprevoyance.fr/contenu/documents/modalites_pratiques/HCR%20027_20-2%20-%20Fiche%20Garantie%20Conventionnelle%20Prevoyance.pdf"
    }
  },
  "contrat salarié . convention collective . optique": {
    "formule": "convention collective = 'optique'",
    "titre": "Optique",
    "icônes": "👓"
  },
  "contrat salarié . convention collective . optique . prime d'ancienneté": {
    "applicable si": "convention collective = 'optique'",
    "remplace": "rémunération . primes . ancienneté",
    "formule": {
      "produit": {
        "assiette": "salaire minimum conventionnel",
        "taux": {
          "variations": [
            {
              "si": "ancienneté >= 15 ans",
              "alors": "15%"
            },
            {
              "si": "ancienneté >= 12 ans",
              "alors": "12%"
            },
            {
              "si": "ancienneté >= 9 ans",
              "alors": "9%"
            },
            {
              "si": "ancienneté >= 6 ans",
              "alors": "6%"
            },
            {
              "si": "ancienneté >= 3 ans",
              "alors": "3%"
            },
            {
              "sinon": "0%"
            }
          ]
        }
      }
    },
    "références": {
      "Légifrance": "https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005736434&cidTexte=KALITEXT000005649634&idConvention=KALICONT000005635912"
    }
  },
  "contrat salarié . convention collective . optique . salaire minimum conventionnel": {
    "unité": "€/mois",
    "formule": {
      "variations": [
        {
          "si": "coefficient < 110",
          "alors": 0
        },
        {
          "si": "coefficient < 115",
          "alors": 1485
        },
        {
          "si": "coefficient < 130",
          "alors": 1555
        },
        {
          "si": "coefficient < 140",
          "alors": 1585
        },
        {
          "si": "coefficient < 160",
          "alors": 1645
        },
        {
          "si": "coefficient < 180",
          "alors": 1650
        },
        {
          "si": "coefficient < 195",
          "alors": 1660
        },
        {
          "si": "coefficient < 210",
          "alors": 1715
        },
        {
          "si": "coefficient < 220",
          "alors": 1845
        },
        {
          "si": "coefficient < 230",
          "alors": 1920
        },
        {
          "si": "coefficient < 250",
          "alors": 1945
        },
        {
          "si": "coefficient < 280",
          "alors": 2150
        },
        {
          "si": "coefficient < 300",
          "alors": 2305
        },
        {
          "si": "coefficient < 330",
          "alors": 2560
        },
        {
          "si": "coefficient < 350",
          "alors": 2715
        },
        {
          "si": "coefficient < 380",
          "alors": 2970
        },
        {
          "sinon": 3170
        }
      ]
    }
  },
  "contrat salarié . convention collective . optique . coefficient": {
    "question": "Quel est le coefficient correspondant au poste du salarié ?",
    "description": "Se référer à la [grille fournie par la convention collective](http://opticiensreunis.org/storage/pdf/D4AciCiqHMr9mgqlTgjW0hvfPyE4w6ZxGTCihzYy.pdf#page=27).",
    "par défaut": "110 points"
  },
  "contrat salarié . convention collective . optique . prévoyance": {
    "non applicable si": "prévoyance obligatoire cadre",
    "formule": {
      "barème": {
        "assiette": "rémunération . brut de base",
        "tranches": [
          {
            "taux": "0.46%",
            "plafond": "4 * plafond sécurité sociale"
          }
        ]
      }
    }
  },
  "contrat salarié . convention collective . optique . prévoyance . employeur": {
    "remplace": "contrat salarié . prévoyance . employeur",
    "formule": "60% * prévoyance"
  },
  "contrat salarié . convention collective . optique . prévoyance . salarié": {
    "remplace": "contrat salarié . prévoyance . salarié",
    "formule": "40% * prévoyance"
  },
  "contrat salarié . convention collective . SVP": {
    "titre": "Spectacle vivant privé",
    "formule": "convention collective = 'SVP'",
    "icônes": "🎭",
    "description": "L'entreprise dépend de la convention collective nationale des entreprises privée du spectacle\n",
    "rend non applicable": "CDD . indemnité compensatrice de congés payés"
  },
  "contrat salarié . convention collective . SVP . cotisations patronales": {
    "titre": "cotisations conventionnelles",
    "remplace": "cotisations . patronales . conventionnelles",
    "formule": {
      "somme": [
        "intermittents du spectacle . caisse des congés spectacle",
        "FCAP",
        "prévoyance"
      ]
    }
  },
  "contrat salarié . convention collective . SVP . FCAP": {
    "titre": "Fond commun d'aide au paritarisme",
    "description": "Le Fonds Commun d’Aide au Paritarisme du Spectacle Vivant Privé (FCAP-SVP) résulte de l’application du titre V – Financement du paritarisme la CCN des entreprises du secteur privé du spectacle vivant. Il a pour but de :\n\n- Permettre aux organisations d’employeurs et de salariés d’exercer leurs missions et de favoriser l’application dans le temps de la Convention collective,\n- De couvrir les frais engagés par les organisations syndicales,\n- De couvrir les frais relatifs au dispositif des Conseillers Conventionnels des Salariés, au nombre de 28\n- De financer le rapport de branche du spectacle vivant privé.\n",
    "unité": "€/an",
    "note": "les minimum et maximum sont fixé par entreprise, et non par salarié",
    "formule": {
      "produit": {
        "plafond": "plafond sécurité sociale",
        "assiette": "rémunération . brut",
        "taux": "0.1%"
      },
      "plancher": "80 €.employés/an / entreprise . effectif",
      "plafond": "300 €.employés/an / entreprise . effectif"
    },
    "références": {
      "Titre V de IDCC 3090": "https://www.legifrance.gouv.fr/affichIDCC.do;?idSectionTA=KALISCTA000028157274&cidTexte=KALITEXT000028157267&idConvention=KALICONT000028157262",
      "Note explicative AUDIENS": "http://www.cheque-intermittents.com/wp-content/uploads/2015/05/FCAP-SVP-EXPLIC_final.pdf"
    }
  },
  "contrat salarié . convention collective . SVP . prévoyance": {
    "formule": {
      "produit": {
        "plafond": "plafond sécurité sociale",
        "assiette": "cotisations . assiette",
        "taux": "1.20%"
      }
    },
    "non applicable si": "prévoyance obligatoire cadre",
    "note": "Dans le cas du statut cadre, la prévoyance obligatoire est plus avantageuse, c'est donc cette dernière qui est prise en compte",
    "références": {
      "notice audiens": "https://www.audiens.org/files/live/sites/siteAudiens/files/03_documents/entreprise/CCN/CCN-SVP-2015.pdf",
      "Article 12.6, Titre VII, IDCC 3090": "https://www.legifrance.gouv.fr/affichIDCCArticle.do;?idArticle=KALIARTI000028157451&cidTexte=KALITEXT000028157267&dateTexte=29990101&categorieLien=id"
    }
  },
  "contrat salarié . intermittents du spectacle": {
    "applicable si": {
      "toutes ces conditions": [
        "CDD . motif = 'classique . usage'",
        "convention collective . SVP"
      ]
    },
    "question": "A quel statut d'intermittent est rattaché l'employé ?",
    "par défaut": "'technicien'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "technicien",
          "artiste"
        ]
      }
    }
  },
  "contrat salarié . intermittents du spectacle . formation professionnelle": {
    "remplace": "formation professionnelle",
    "formule": {
      "somme": [
        "50 €/mois",
        {
          "produit": {
            "assiette": "rémunération . brut",
            "taux": "2.10%"
          }
        }
      ]
    }
  },
  "contrat salarié . intermittents du spectacle . caisse des congés spectacle": {
    "formule": {
      "produit": {
        "assiette": "rémunération . brut",
        "taux": "15.40%"
      }
    },
    "références": {
      "audiens.org": "https://www.audiens.org/files/live/sites/siteAudiens/files/03_documents/entreprise/Fiches-techniques/Conges-Spectacles-Mode-d-emploi-employeur-2019.pdf",
      "Article L3141-30 du Code du Travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=DF6E6424807679A6EDC2915496BEA32D.tplgfr22s_2?idArticle=LEGIARTI000033020675&cidTexte=LEGITEXT000006072050&dateTexte=20200320"
    }
  },
  "contrat salarié . intermittents du spectacle . retraite complémentaire techniciens et cadre": {
    "applicable si": {
      "une de ces conditions": [
        "statut cadre",
        "technicien"
      ]
    },
    "formule": "oui",
    "remplace": [
      {
        "règle": "retraite complémentaire . employeur . taux tranche 1",
        "par": "3.94%"
      },
      {
        "règle": "retraite complémentaire . salarié . taux tranche 1",
        "par": "3.93%"
      }
    ],
    "références": {
      "audiens.org": "https://www.audiens.org/solutions/entreprises-la-retraite-complementaire-agirc-arcco-au-1er-janvier-2019.html"
    }
  },
  "contrat salarié . intermittents du spectacle . technicien": {
    "formule": "intermittents du spectacle = 'technicien'"
  },
  "contrat salarié . intermittents du spectacle . technicien . non cadre": {
    "formule": "statut cadre = non",
    "remplace": [
      {
        "règle": "retraite complémentaire . employeur . taux tranche 2",
        "par": "10.80%"
      },
      {
        "règle": "retraite complémentaire . salarié . taux tranche 2",
        "par": "10.79%"
      },
      {
        "règle": "plafond sécurité sociale",
        "par": "plafond sécurité sociale temps plein",
        "dans": [
          "retraite complémentaire",
          "contribution d'équilibre général",
          "contribution d'équilibre technique"
        ]
      }
    ],
    "références": {
      "audiens.org": "https://www.audiens.org/solutions/entreprises-la-retraite-complementaire-agirc-arcco-au-1er-janvier-2019.html"
    }
  },
  "contrat salarié . intermittents du spectacle . artiste": {
    "formule": "intermittents du spectacle = 'artiste'",
    "description": "Sont considérés comme artistes du spectacle :\n- L'artiste lyrique\n- L'artiste dramatique\n- L'artiste chorégraphique\n- L'artiste de variétés\n- Le musicien\n- Le chansonnier\n- L'artiste de complément\n- Le chef d'orchestre\n- L'arrangeur-orchestrateur\n- Le metteur en scène, le réalisateur et le chorégraphe, pour l'exécution matérielle de leur conception artistique\n- L'artiste de cirque\n- Le marionnettiste\n- Les personnes dont l'activité est reconnue comme un métier d'artiste-interprète par les conventions collectives du spectacle vivant étendues.\n",
    "références": {
      "Article L7121-2": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000032859810&cidTexte=LEGITEXT000006072050&dateTexte=20160709"
    }
  },
  "contrat salarié . intermittents du spectacle . artiste . non cadre": {
    "formule": "statut cadre = non",
    "remplace": [
      {
        "règle": "plafond sécurité sociale",
        "par": "plafond sécurité sociale temps plein",
        "dans": [
          "retraite complémentaire",
          "contribution d'équilibre général",
          "contribution d'équilibre technique"
        ]
      },
      {
        "règle": "retraite complémentaire . employeur . taux tranche 1",
        "par": "4.45%"
      },
      {
        "règle": "retraite complémentaire . employeur . taux tranche 2",
        "par": "10.80%"
      },
      {
        "règle": "retraite complémentaire . salarié . taux tranche 1",
        "par": "4.44%"
      },
      {
        "règle": "retraite complémentaire . salarié . taux tranche 2",
        "par": "10.79%"
      }
    ],
    "références": {
      "audiens.org": "https://www.audiens.org/solutions/entreprises-la-retraite-complementaire-agirc-arcco-au-1er-janvier-2019.html"
    }
  },
  "contrat salarié . intermittents du spectacle . artiste . activité accessoire": {
    "question": "L'artiste est-il rémunéré pour une activité accessoire (dispense de cours, stages, etc) ?\n",
    "par défaut": "non"
  },
  "contrat salarié . intermittents du spectacle . artiste . réduction de taux": {
    "rend non applicable": "réduction générale",
    "non applicable si": "activité accessoire",
    "remplace": [
      {
        "règle": "maladie . taux employeur",
        "par": "maladie . taux employeur * réduction de taux"
      },
      {
        "règle": "maladie . taux salarié",
        "par": "maladie . taux salarié * réduction de taux"
      },
      {
        "règle": "vieillesse . employeur . plafonnée . taux",
        "par": "vieillesse . employeur . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "vieillesse . employeur . déplafonnée . taux",
        "par": "vieillesse . employeur . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "vieillesse . salarié . plafonnée . taux",
        "par": "vieillesse . salarié . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "vieillesse . salarié . déplafonnée . taux",
        "par": "vieillesse . salarié . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "allocations familiales . taux",
        "par": "allocations familiales . taux * réduction de taux"
      },
      {
        "règle": "établissement . taux du versement transport",
        "par": "établissement . taux du versement transport * réduction de taux"
      },
      {
        "règle": "FNAL . taux",
        "par": "FNAL . taux * réduction de taux"
      }
    ],
    "formule": "70%"
  },
  "contrat salarié . intermittents du spectacle . artiste . réduction de taux . ATMP": {
    "remplace": "ATMP . taux",
    "formule": {
      "variations": [
        {
          "si": "régime alsace moselle",
          "alors": "1.54%"
        },
        {
          "sinon": "1.12%"
        }
      ]
    }
  },
  "contrat salarié . intermittents du spectacle . artiste . nombre jours travaillés": {
    "question": "Pour combien de jours continus l'artiste est-il engagé ?",
    "par défaut": "5 jours"
  },
  "contrat salarié . intermittents du spectacle . artiste . plafond proratisé": {
    "applicable si": "nombre jours travaillés < 5",
    "unité": "€/mois",
    "remplace": {
      "règle": "plafond sécurité sociale",
      "dans": [
        "FNAL",
        "vieillesse"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "plafond horaire sécurité sociale",
        "facteur": "12 * nombre jours travaillés"
      }
    }
  },
  "contrat salarié . intermittents du spectacle . artiste . acteur de complément": {
    "non applicable si": "activité accessoire",
    "question": "L'artiste est-il un acteur de complément engagé à la journée pour une production cinématographique ?",
    "par defaut": "non"
  },
  "contrat salarié . intermittents du spectacle . artiste . acteur de complément . nombre jours travaillés": {
    "remplace": "artiste . nombre jours travaillés",
    "formule": 1
  },
  "contrat salarié . intermittents du spectacle . artiste . acteur de complément . assiette forfaitaire": {
    "applicable si": "rémunération . brut < 6% * plafond sécurité sociale temps plein",
    "remplace": [
      "contrat salarié . cotisations . assiette forfaitaire",
      {
        "règle": "nombre jours travaillés",
        "par": 1
      }
    ],
    "formule": {
      "produit": {
        "assiette": "SMIC horaire",
        "facteur": 9
      }
    }
  },
  "contrat salarié . convention collective . sport": {
    "formule": "convention collective = 'sport'",
    "titre": "Sport",
    "icônes": "🎽",
    "description": "L'entreprise dépend de la convention collective nationale des sportifs (CCNS)\nLes disciplines concernées sont tous les sports pour lesquels il existe une fédération française agréée par le ministère de la Jeunesse et des Sports.\n"
  },
  "contrat salarié . convention collective . sport . cotisations": "oui",
  "contrat salarié . convention collective . sport . cotisations . patronales": {
    "titre": "cotisations conventionnelles",
    "remplace": [
      {
        "règle": "cotisations . patronales . conventionnelles"
      }
    ],
    "formule": {
      "somme": [
        "prévoyance . employeur",
        "financement du paritarisme"
      ]
    }
  },
  "contrat salarié . convention collective . sport . cotisations . financement du paritarisme": {
    "note": "se calcule sur la masse salariale",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.06%"
      },
      "plancher": "3 €.employé/an / entreprise . effectif"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . prévoyance": {
    "remplace": [
      {
        "règle": "cotisations . salariales . conventionnelles",
        "par": "prévoyance . salarié"
      },
      {
        "règle": "avantages sociaux",
        "par": {
          "somme": [
            "prévoyance . employeur",
            "avantages sociaux"
          ]
        }
      }
    ],
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "plafond": "8 * plafond sécurité sociale",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "taux": "0.29%"
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "taux": "0.29%"
          }
        ]
      }
    },
    "références": {
      "Article 10.8 de la CCNS (IDCC 2511)": "https://www.legifrance.gouv.fr/affichIDCCArticle.do;?idArticle=KALIARTI000033304755&cidTexte=KALITEXT000017577657&dateTexte=29990101&categorieLien=id"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . régime frais de santé": {
    "remplace": "contrat salarié . complémentaire santé . forfait",
    "formule": {
      "produit": {
        "assiette": "plafond sécurité sociale temps plein",
        "taux": "taux"
      }
    }
  },
  "contrat salarié . convention collective . sport . cotisations . régime frais de santé . taux": {
    "formule": {
      "variations": [
        {
          "si": "régime alsace moselle",
          "alors": {
            "variations": [
              {
                "si": "option . R1",
                "alors": "0.59%"
              },
              {
                "si": "option . R2",
                "alors": "0.77%"
              },
              {
                "si": "option . R3",
                "alors": "0.89%"
              }
            ]
          }
        },
        {
          "sinon": {
            "variations": [
              {
                "si": "option . R1",
                "alors": "0.92%"
              },
              {
                "si": "option . R2",
                "alors": "1.17%"
              },
              {
                "si": "option . R3",
                "alors": "1.32%"
              }
            ]
          }
        }
      ]
    },
    "référence": {
      "unamens.fr": "https://www.umanens.fr/reglementation-couverture-sante-obligatoire/ccn-sport",
      "unamens (notice pdf)": "https://www.umanens.fr/documents/doc-offres-2018/sport/juin-2019/CCN_SPORT_PLAQ_EMPLOYEUR_2019.pdf"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . régime frais de santé . option": {
    "question": "Quel option a été choisi pour le régime des frais de santé ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "R1",
          "R2",
          "R3"
        ]
      }
    },
    "par défaut": "'R1'",
    "références": {
      "unamens.fr": "https://www.umanens.fr/reglementation-couverture-sante-obligatoire/ccn-sport"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . régime frais de santé . option . R1": {
    "formule": "option = 'R1'"
  },
  "contrat salarié . convention collective . sport . cotisations . régime frais de santé . option . R2": {
    "formule": "option = 'R2'"
  },
  "contrat salarié . convention collective . sport . cotisations . régime frais de santé . option . R3": {
    "formule": "option = 'R3'"
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle": {
    "remplace": "contrat salarié . formation professionnelle",
    "formule": {
      "somme": [
        "plan de formation",
        "professionnalisation",
        "CIF CDI",
        "CIF CDD"
      ]
    },
    "références": {
      "Article 8.6 de la CCNS (IDCC2511)": "https://www.legifrance.gouv.fr/affichIDCCArticle.do;?idArticle=KALIARTI000034406905&cidTexte=KALITEXT000017577657&dateTexte=29990101&categorieLien=id"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle . plan de formation": {
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": {
          "variations": [
            {
              "si": "entreprise . effectif < 20",
              "alors": "1.45%"
            },
            {
              "si": "entreprise . effectif >= 20",
              "alors": "0.90%"
            }
          ]
        }
      },
      "plancher": "versement minimum"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle . plan de formation . versement minimum": {
    "applicable si": "entreprise . effectif < 10",
    "formule": "30 €/mois"
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle . professionnalisation": {
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": {
          "variations": [
            {
              "si": "entreprise . effectif < 20",
              "alors": "0.15%"
            },
            {
              "si": "entreprise . effectif >= 20",
              "alors": "0.50%"
            }
          ]
        }
      },
      "plancher": "versement minimum"
    }
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle . professionnalisation . versement minimum": {
    "applicable si": "entreprise . effectif < 10",
    "formule": "5 €/mois"
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle . CIF CDI": {
    "applicable si": {
      "toutes ces conditions": [
        "CDI",
        "entreprise . effectif >= 20"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.20%"
      }
    }
  },
  "contrat salarié . convention collective . sport . cotisations . formation professionnelle . CIF CDD": {
    "applicable si": "CDD",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "1%"
      }
    }
  },
  "contrat salarié . convention collective . sport . cotisations . assiette franchisée": {
    "formule": {
      "valeur": "cotisations . assiette",
      "abattement": "franchise"
    }
  },
  "contrat salarié . convention collective . sport . joueur entraineur": {
    "question": "Le joueur est-il aussi entraineur ?",
    "par défaut": "non"
  },
  "contrat salarié . convention collective . sport . exonération cotisation AT": {
    "non applicable si": {
      "une de ces conditions": [
        "joueur entraineur",
        "refus"
      ]
    },
    "remplace": {
      "règle": "ATMP",
      "par": "non"
    },
    "formule": "oui"
  },
  "contrat salarié . convention collective . sport . exonération cotisation AT . refus": {
    "titre": "refus exonération AT",
    "question": "L'employeur a-t'il refusé d'être exonéré de cotisations AT ?",
    "par défaut": "non"
  },
  "contrat salarié . convention collective . sport . cotisations . assiette forfaitaire": {
    "applicable si": "assiette franchisée < SMIC horaire * 115 heures/mois",
    "remplace": "contrat salarié . cotisations . assiette forfaitaire",
    "formule": {
      "grille": {
        "assiette": "assiette franchisée",
        "multiplicateur": "SMIC horaire / 1 mois",
        "unité": "€/mois",
        "tranches": [
          {
            "montant": "5 * SMIC horaire",
            "plafond": "45 heures"
          },
          {
            "montant": "15 * SMIC horaire",
            "plafond": "60 heures"
          },
          {
            "montant": "25 * SMIC horaire",
            "plafond": "80 heures"
          },
          {
            "montant": "35 * SMIC horaire",
            "plafond": "100 heures"
          },
          {
            "montant": "50 * SMIC horaire",
            "plafond": "115 heures"
          }
        ]
      }
    }
  },
  "contrat salarié . convention collective . sport . primes . nombre de manifestations": {
    "question": "Combien de manifestations rémunérées le joueur a-t'il effectué ?",
    "par défaut": "0 manifestations"
  },
  "contrat salarié . convention collective . sport . primes": {
    "titre": "primes de manifestation",
    "remplace": "rémunération . primes . activité . conventionnelles",
    "unité": "€/mois",
    "formule": {
      "somme": [
        "manifestation 1",
        "manifestation 2",
        "manifestation 3",
        "manifestation 4",
        "manifestation 5",
        "autres manifestations"
      ]
    }
  },
  "contrat salarié . convention collective . sport . primes . manifestation 1": {
    "question": "Quelle prime pour la première manifestation ?",
    "applicable si": "nombre de manifestations > 0",
    "par défaut": "100 €"
  },
  "contrat salarié . convention collective . sport . primes . manifestation 1 . franchise": {
    "titre": "franchise manifestation 1",
    "formule": {
      "valeur": "manifestation 1",
      "plafond": "70% * plafond journalier sécurité sociale"
    }
  },
  "contrat salarié . convention collective . sport . primes . manifestation 2": {
    "question": "Quelle prime pour la deuxième manifestation ?",
    "applicable si": "nombre de manifestations > 1",
    "par défaut": "100 €"
  },
  "contrat salarié . convention collective . sport . primes . manifestation 2 . franchise": {
    "titre": "franchise manifestation 2",
    "formule": {
      "valeur": "manifestation 2",
      "plafond": "70% * plafond journalier sécurité sociale"
    }
  },
  "contrat salarié . convention collective . sport . primes . manifestation 3": {
    "question": "Quelle prime pour la troisième manifestation ?",
    "applicable si": "nombre de manifestations > 2",
    "par défaut": "100 €"
  },
  "contrat salarié . convention collective . sport . primes . manifestation 3 . franchise": {
    "titre": "franchise manifestation 3",
    "formule": {
      "valeur": "manifestation 3",
      "plafond": "70% * plafond journalier sécurité sociale"
    }
  },
  "contrat salarié . convention collective . sport . primes . manifestation 4": {
    "question": "Quelle prime pour la quatrième manifestation ?",
    "applicable si": "nombre de manifestations > 3",
    "par défaut": "100 €"
  },
  "contrat salarié . convention collective . sport . primes . manifestation 4 . franchise": {
    "titre": "franchise manifestation 4",
    "formule": {
      "valeur": "manifestation 4",
      "plafond": "70% * plafond journalier sécurité sociale"
    }
  },
  "contrat salarié . convention collective . sport . primes . manifestation 5": {
    "question": "Quelle prime pour la cinquième manifestation ?",
    "applicable si": "nombre de manifestations > 4",
    "par défaut": "100 €"
  },
  "contrat salarié . convention collective . sport . primes . manifestation 5 . franchise": {
    "titre": "franchise manifestation 5",
    "formule": {
      "valeur": "manifestation 5",
      "plafond": "70% * plafond journalier sécurité sociale"
    }
  },
  "contrat salarié . convention collective . sport . primes . autres manifestations": {
    "question": "Quelles primes pour les autres manifestations ?",
    "applicable si": "nombre de manifestations > 5",
    "par défaut": "100 €"
  },
  "contrat salarié . convention collective . sport . cotisations . franchise": {
    "applicable si": "entreprise . effectif < 10",
    "unité": "€/mois",
    "formule": {
      "somme": [
        "primes . manifestation 1 . franchise",
        "primes . manifestation 2 . franchise",
        "primes . manifestation 3 . franchise",
        "primes . manifestation 4 . franchise",
        "primes . manifestation 5 . franchise"
      ]
    }
  },
  "dirigeant": {
    "question": "Quel est le régime social du dirigeant ?",
    "par défaut": "non",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "auto-entrepreneur",
          "assimilé salarié",
          "indépendant"
        ]
      }
    }
  },
  "dirigeant . rémunération": "oui",
  "dirigeant . rémunération . totale": {
    "question": "Quel montant total pensez-vous dégager pour votre rémunération ?",
    "description": "C'est ce que l'entreprise dépense en tout pour la rémunération du dirigeant. Cette rémunération \"super-brute\" inclut toutes les cotisations sociales à payer. On peut aussi considérer que c'est la valeur monétaire du travail du dirigeant.\n",
    "titre": "Rémunération totale",
    "unité": "€/an",
    "résumé": "Incluant les cotisations et contributions",
    "variations": [
      {
        "si": "assimilé salarié",
        "alors": "contrat salarié . rémunération . total"
      },
      {
        "si": "entreprise . imposition . IS",
        "alors": {
          "somme": [
            "nette après impôt",
            "impôt . montant",
            "cotisations"
          ],
          "par défaut": "entreprise . chiffre d'affaires - entreprise . charges",
          "plancher": "cotisations"
        }
      },
      {
        "sinon": "entreprise . chiffre d'affaires - entreprise . charges"
      }
    ]
  },
  "dirigeant . rémunération . nette": {
    "titre": "revenu net",
    "question": "Quelle est votre revenu net ?",
    "résumé": "Après déduction des cotisations, contributions et charges",
    "somme": [
      "rémunération . totale",
      "(- cotisations)"
    ]
  },
  "dirigeant . rémunération . cotisations": {
    "variations": [
      {
        "si": "assimilé salarié",
        "alors": "contrat salarié . cotisations"
      },
      {
        "si": "indépendant",
        "alors": "indépendant . cotisations et contributions"
      },
      {
        "si": "auto-entrepreneur",
        "alors": "auto-entrepreneur . cotisations et contributions"
      }
    ]
  },
  "dirigeant . rémunération . imposable": {
    "titre": "revenu imposable",
    "variations": [
      {
        "si": "assimilé salarié",
        "alors": "contrat salarié . rémunération . net imposable"
      },
      {
        "si": "indépendant",
        "alors": "indépendant . revenu professionnel"
      },
      {
        "si": "auto-entrepreneur",
        "alors": "auto-entrepreneur . impôt . revenu imposable"
      }
    ]
  },
  "dirigeant . rémunération . impôt": {
    "titre": "impôt sur le revenu",
    "somme": [
      {
        "produit": {
          "assiette": "imposable",
          "taux": "impôt . taux d'imposition"
        }
      },
      "auto-entrepreneur . impôt . versement libératoire . montant"
    ],
    "arrondi": "oui"
  },
  "dirigeant . rémunération . nette après impôt": {
    "titre": "Revenu après impôt",
    "unité": "€/an",
    "arrondi": "oui",
    "question": "Quel est le revenu net après impôt souhaité ?",
    "description": "Le revenu net après déduction de l'impôt sur le revenu et des cotisations sociales.",
    "valeur": "rémunération . nette - impôt . montant",
    "résumé": "Ce que vous rapporte cette activité"
  },
  "dirigeant . assimilé salarié": {
    "description": "Certains dirigeants d'entreprise (c'est notamment le cas pour les SASU) sont considérés par la sécurité sociale comme assimilés aux salariés. Ils sont alors au régime général de la sécurité sociale, avec quelques contraintes cependant. Par exemple, ils ne cotisent pas au chômage, et n'y ont donc pas droit.\n",
    "formule": "dirigeant = 'assimilé salarié'",
    "remplace": [
      {
        "règle": "contrat salarié",
        "par": "'CDI'"
      },
      {
        "règle": "contrat salarié . statut cadre",
        "par": "oui"
      },
      {
        "règle": "entreprise . imposition",
        "par": "'IS'"
      }
    ],
    "rend non applicable": [
      "contrat salarié . convention collective",
      "contrat salarié . activité partielle",
      "contrat salarié . déduction forfaitaire spécifique",
      "contrat salarié . rémunération . primes",
      "contrat salarié . rémunération . primes . fin d'année",
      "contrat salarié . rémunération . primes . activité",
      "contrat salarié . frais professionnels",
      "contrat salarié . chômage",
      "contrat salarié . réduction générale",
      "contrat salarié . allocations familiales . taux réduit",
      "contrat salarié . maladie . taux employeur . taux réduit",
      "contrat salarié . lodeom",
      "contrat salarié . AGS",
      "contrat salarié . APEC",
      "contrat salarié . contribution au dialogue social",
      "contrat salarié . temps de travail . temps partiel",
      "contrat salarié . temps de travail . heures supplémentaires",
      "contrat salarié . déduction forfaitaire spécifique",
      "contrat salarié . régime des impatriés",
      "contrat salarié . rémunération . contrôle smic",
      "entreprise . association non lucrative"
    ],
    "références": {
      "Le régime des dirigeants": "https://www.urssaf.fr/portail/home/employeur/creer/choisir-une-forme-juridique/le-statut-du-dirigeant/les-dirigeants-rattaches-au-regi.html"
    },
    "note": "Nous ne gérons pas le cas des SAS(U) à l'IR pour l'instant"
  },
  "dirigeant . assimilé salarié . réduction ACRE": {
    "applicable si": "entreprise . ACRE",
    "non applicable si": "contrat salarié . cotisations . assiette > 100% * plafond sécurité sociale temps plein",
    "variations": [
      {
        "si": "contrat salarié . cotisations . assiette <= 75% * plafond sécurité sociale temps plein",
        "alors": {
          "somme": [
            "contrat salarié . maladie",
            "contrat salarié . allocations familiales",
            "contrat salarié . vieillesse"
          ]
        }
      },
      {
        "sinon": {
          "produit": {
            "assiette": "assiette taux réduit",
            "taux": "(plafond sécurité sociale temps plein - contrat salarié . cotisations . assiette) / (25% * plafond sécurité sociale temps plein)"
          }
        }
      }
    ],
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/laccre/quelles-exonerations.html#FilAriane"
    }
  },
  "dirigeant . assimilé salarié . réduction ACRE . assiette taux réduit": {
    "recalcul": {
      "règle": {
        "somme": [
          "contrat salarié . maladie",
          "contrat salarié . allocations familiales",
          "contrat salarié . vieillesse"
        ]
      },
      "avec": {
        "contrat salarié . cotisations . assiette": "75% * plafond sécurité sociale temps plein",
        "entreprise . ACRE": "non",
        "contrat salarié . maladie . employeur . contribution solidarité autonomie": "non"
      }
    }
  },
  "dirigeant . assimilé salarié . réduction ACRE . notification taux annuel": {
    "formule": "oui",
    "type": "notification",
    "description": "Le taux ACRE utilisé est une moyenne annuelle. Le\nsimulateur ne prends pas encore en compte le calcul de l'ACRE mois par mois.\n"
  },
  "dirigeant . auto-entrepreneur": {
    "rend non applicable": "contrat salarié",
    "remplace": [
      {
        "règle": "entreprise . imposition",
        "par": "'IR'"
      },
      {
        "règle": "entreprise . imposition . IR . micro-fiscal",
        "par": "oui"
      }
    ],
    "formule": "dirigeant = 'auto-entrepreneur'",
    "icônes": "🚶",
    "description": "L'auto-entreprise est une entreprise individuelle simplifiée. À l'origine connu sous l'appellation « auto-entrepreneur », le régime de « micro-entrepreneur » est un régime de travailleur indépendant créé pour simplifier la gestion administrative, notamment en remplaçant toutes les cotisations sociales par un prélèvement unique mensuel.\n"
  },
  "dirigeant . auto-entrepreneur . net de cotisations": {
    "titre": "Revenu net de cotisations",
    "arrondi": "oui",
    "unité": "€/an",
    "remplace": "rémunération . nette",
    "identifiant court": "auto-entrepreneur-net",
    "résumé": "Avant impôt",
    "question": "Quel revenu avant impôt voulez-vous toucher ?",
    "description": "Il s'agit du revenu après déductions des cotisations, avant le paiement de l'impôt sur le revenu.",
    "formule": "entreprise . chiffre d'affaires - cotisations et contributions"
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions": {
    "unité": "€/mois",
    "somme": [
      "cotisations",
      "TFC",
      "contribution formation professionnelle"
    ],
    "références": {
      "Imposition du micro-entrepreneur": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23267"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC": {
    "titre": "Taxes pour frais de chambre",
    "unité": "€/mois",
    "note": "Nous n'avons pas intégré les exceptions suivantes :\n\n- Artisans en double immatriculation CCI-CMA\n- Les taux de l'Alsace et de la Moselle\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    },
    "somme": [
      "commerce",
      "métiers"
    ]
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . commerce": {
    "titre": "taxe pour frais de chambre de commerce",
    "unité": "€/mois",
    "applicable si": "entreprise . activité = 'commerciale'",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": "0.044%"
        },
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": "0.015%"
        }
      ]
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . métiers": {
    "unité": "€/mois",
    "titre": "taxe pour frais de chambre des métiers",
    "applicable si": "entreprise . activité = 'artisanale'",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": {
            "nom": "taux service",
            "valeur": "0.48%"
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": {
            "nom": "taux vente",
            "valeur": "0.22%"
          }
        }
      ]
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . métiers . taux Alsace": {
    "remplace": [
      {
        "règle": "taux service",
        "par": "0.65%"
      },
      {
        "règle": "taux vente",
        "par": "0.29%"
      }
    ],
    "une de ces conditions": [
      "établissement . localisation . département = 'Bas-Rhin'",
      "établissement . localisation . département = 'Haut-Rhin'"
    ],
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . métiers . taux Moselle": {
    "remplace": [
      {
        "règle": "taux service",
        "par": "0.83%"
      },
      {
        "règle": "taux vente",
        "par": "0.37%"
      }
    ],
    "valeur": "établissement . localisation . département = 'Moselle'",
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . contribution formation professionnelle": {
    "titre": "Contribution à la formation professionnelle",
    "description": "En plus des charges sociales, les auto-entrepreneurs sont redevables d’une\ncontribution à la formation professionnelle leur permettant de bénéficier du\ndroit à la formation professionnelle (à condition d’avoir déclaré un chiffre\nd’affaires positif au cours des 12 derniers mois).\n",
    "acronyme": "CFP",
    "unité": "€/mois",
    "références": {
      "Article L6331-48 du code du travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006904325",
      "autoentrepreneur.urssaf.fr": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html#cout-durant-vie-auto-entreprise",
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23459",
      "shine.fr": "https://www.shine.fr/blog/formation-professionnelle-auto-entrepreneur/"
    },
    "note": "Les taux implémentés sont ceux prélevés par l'Urssaf.\n",
    "produit": {
      "composantes": [
        {
          "attributs": {
            "nom": "revenus BIC"
          },
          "assiette": "entreprise . chiffre d'affaires . BIC",
          "taux": {
            "variations": [
              {
                "si": "entreprise . activité = 'artisanale'",
                "alors": "0.3%"
              },
              {
                "sinon": "0.1%"
              }
            ]
          }
        },
        {
          "attributs": {
            "nom": "revenus BNC"
          },
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": {
            "variations": [
              {
                "si": "entreprise . activité . libérale réglementée",
                "alors": "0.2%"
              },
              {
                "sinon": "0.1%"
              }
            ]
          }
        }
      ]
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations": {
    "description": "Les cotisations sociales donnent à l'auto-entrepreneur accès à une\nprotection sociale minimale : une retraite, des soins de santé, des\nallocations familiales, etc.\n\nL'auto-entreprise est un régime simplifié : plutôt qu'une fiche de paie\ncomplexe, toutes les cotisations sont regroupées dans un *forfait* dont le\ntaux dépend de la catégorie d'activité.\n",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . service",
          "taux": {
            "nom": "taux prestation de service",
            "variations": [
              {
                "si": "entreprise . activité . libérale réglementée",
                "alors": "22.20%"
              },
              {
                "sinon": "22%"
              }
            ]
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": {
            "nom": "taux vente restauration hébergement",
            "valeur": "12.8%"
          }
        }
      ]
    },
    "références": {
      "guide urssaf (PDF)": "https://www.autoentrepreneur.urssaf.fr/portail/files/Guides/Metropole/Presentation_AE.pdf",
      "La protection sociale du micro-entrepreneur": "https://bpifrance-creation.fr/encyclopedie/micro-entreprise-regime-auto-entrepreneur/fiscal-social-comptable/protection-sociale",
      "economie.gouv.fr": "https://www.economie.gouv.fr/entreprises/micro-entreprise-auto-entreprise-charges-sociales",
      "actualité urssaf.fr (2019)": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/toutes-les-actualites/nouveautes-2019--ce-qui-change-e.html"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations . taux ACRE": {
    "titre": "taux ACRE auto-entrepreneur",
    "applicable si": "entreprise . ACRE",
    "remplace": {
      "règle": "taux vente restauration hébergement",
      "par": "taux ACRE * taux vente restauration hébergement"
    },
    "description": "Ce taux correspond à la réduction de cotisations qui s'applique pour\nl'auto-entrepreneur bénéficiant de l'Acre. Un taux de 75% signifie que\nl'auto-entrepreneur doit s'acquitter de 75% du montant d'origine des\ncotisations.\n",
    "unité": "%",
    "formule": {
      "variations": [
        {
          "si": "entreprise . date de création < 01/04/2019",
          "alors": {
            "grille": {
              "assiette": "entreprise . durée d'activité",
              "tranches": [
                {
                  "montant": "25%",
                  "plafond": "1 an"
                },
                {
                  "montant": "50%",
                  "plafond": "2 ans"
                },
                {
                  "montant": "90%",
                  "plafond": "3 ans"
                }
              ]
            }
          }
        },
        {
          "si": "entreprise . date de création < 01/04/2020",
          "alors": {
            "grille": {
              "assiette": "entreprise . durée d'activité",
              "tranches": [
                {
                  "montant": "25%",
                  "plafond": "1 an"
                },
                {
                  "montant": "75%",
                  "plafond": "2 ans"
                },
                {
                  "montant": "90%",
                  "plafond": "3 ans"
                }
              ]
            }
          }
        },
        {
          "sinon": {
            "applicable si": "entreprise . durée d'activité < 1 an",
            "valeur": "50%"
          }
        }
      ]
    },
    "références": {
      "FAQ Urssaf depuis 04/2020": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/questions-frequentes.html#jai-cree-mon-auto-entreprise-en",
      "FAQ Urssaf avant 04/2020": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/questions-frequentes.html#quest-ce-qui-change-pour-moi-si",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32318"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations . taux ACRE . prestation de service": {
    "remplace": "taux prestation de service",
    "titre": "taux prestation de service avec ACRE",
    "variations": [
      {
        "si": {
          "toutes ces conditions": [
            "entreprise . activité . libérale réglementée",
            "entreprise . date de création >= 01/04/2020"
          ]
        },
        "alors": "12.10%"
      },
      {
        "sinon": "taux ACRE * taux prestation de service"
      }
    ],
    "références": {
      "urssaf.fr": "https://www.autoentrepreneur.urssaf.fr/portail/files/Guides/Metropole/Presentation_AE.pdf"
    }
  },
  "dirigeant . auto-entrepreneur . notification calcul ACRE annuel": {
    "formule": "entreprise . ACRE",
    "type": "notification",
    "description": "Le taux ACRE utilisé est celui correspondant au mois courant. Le\nsimulateur ne prends pas encore en compte le chevauchement de 2 période\nd'acre sur une meme année.\n"
  },
  "dirigeant . auto-entrepreneur . impôt": "oui",
  "dirigeant . auto-entrepreneur . impôt . revenu imposable": {
    "titre": "revenu imposable auto-entrepreneur",
    "description": "Le micro-entrepreneur est dispensé d'établir une déclaration professionnelle de bénéfices au titre des BNC ou BIC.\n\nIl lui suffit de porter dans la déclaration complémentaire de revenu (n°2042-C Pro) le montant annuel du chiffre d'affaires brut (BIC) ou des recettes (BNC).\n",
    "valeur": "entreprise . chiffre d'affaires",
    "abattement": {
      "applicable si": "entreprise . imposition . IR . micro-fiscal",
      "produit": {
        "composantes": [
          {
            "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
            "taux": "71%"
          },
          {
            "assiette": "entreprise . chiffre d'affaires . service BIC",
            "taux": "50%"
          },
          {
            "assiette": "entreprise . chiffre d'affaires . service BNC",
            "taux": "34%"
          }
        ]
      },
      "plancher": {
        "variations": [
          {
            "si": "entreprise . activité . mixte",
            "alors": "610 €/an"
          },
          {
            "sinon": "305 €/an"
          }
        ]
      }
    },
    "références": {
      "Légifrance": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000006199553&cidTexte=LEGITEXT000006069577",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23267"
    }
  },
  "dirigeant . auto-entrepreneur . impôt . versement libératoire": {
    "rend non applicable": "revenu imposable",
    "description": "Avec l'option pour le versement libératoire, l’impôt sur le revenu est payé en même temps que vos cotisations (par mois ou par trimestre) avec application d’un taux spécifique en fonction de votre activité. Pour en bénéficier, votre revenu fiscal de référence ne doit pas excéder 27 086 € en 2018\n",
    "question": "Bénéficiez-vous du versement libératoire de l'impôt sur le revenu ?",
    "par défaut": "non"
  },
  "dirigeant . auto-entrepreneur . impôt . versement libératoire . contrôle seuil": {
    "type": "notification",
    "formule": "impôt . foyer fiscal . revenu fiscal de référence > 27519 €/an",
    "description": "Le versement libératoire n'est pas disponible si le revenu fiscal de\nréférence de votre ménage est supérieur à 27 519 € par part en 2018\n"
  },
  "dirigeant . auto-entrepreneur . impôt . versement libératoire . montant": {
    "titre": "versement libératoire auto-entrepreneur",
    "description": "Si vous avez opté pour le versement libératoire, l’impôt sur le revenu est\npayé en même temps que vos cotisations (par mois ou par trimestre) avec\napplication d’un taux spécifique en fonction de votre activité\n",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": "1%"
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BIC",
          "taux": "1.7%"
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": "2.2%"
        }
      ]
    }
  },
  "dirigeant . auto-entrepreneur . net après impôt": {
    "titre": "revenu net après impôt",
    "identifiant court": "auto-entrepreneur-net-apres-impot",
    "résumé": "Avant déduction des dépenses liées à l'activité",
    "unité": "€/an",
    "remplace": "rémunération . nette après impôt",
    "arrondi": "oui",
    "question": "Quel est le revenu net après impôt souhaité ?",
    "description": "Le revenu net de l'auto-entrepreneur après déduction de l'impôt sur le revenu et des cotisations sociales.\n\n**Attention :** Pour bien évaluer la rentabilité de l'entreprise, il ne faut pas oublier de retrancher à ce montant les dépenses engagées dans le cadre de l'activité. Cela peut inclure par exemple :\n- L'achat des matière premières\n- L'achat des outils / materiel\n- L'abonnement à des services payants\n- La location d'un local\n- etc...",
    "valeur": "net de cotisations - rémunération . impôt"
  },
  "dirigeant . auto-entrepreneur . chiffre d'affaires": {
    "question": "Quel est votre chiffre d'affaires ?",
    "résumé": "Montant total des recettes (hors taxe)",
    "remplace": "entreprise . chiffre d'affaires",
    "inversion numérique": {
      "avec": [
        "rémunération . totale",
        "net après impôt",
        "net de cotisations"
      ]
    }
  },
  "dirigeant . indépendant": {
    "rend non applicable": "contrat salarié",
    "formule": "dirigeant = 'indépendant'"
  },
  "dirigeant . indépendant . revenu professionnel": {
    "description": "rémunération du dirigeant au régime des indépendant",
    "unité": "€/an",
    "arrondi": "oui",
    "résoudre la référence circulaire": "oui",
    "variations": [
      {
        "si": "entreprise . imposition = 'IS'",
        "alors": {
          "somme": [
            "rémunération . nette",
            "cotisations et contributions . non déductibles"
          ]
        }
      },
      {
        "sinon": "entreprise . résultat fiscal"
      }
    ]
  },
  "dirigeant . indépendant . assiette des cotisations": {
    "unité": "€/an",
    "description": "Il s'agit de l'assiette des cotisations sociales, nombre forcément positif",
    "valeur": {
      "nom": "sans plancher",
      "somme": [
        "revenu professionnel",
        "cotisations facultatives . déductibles"
      ]
    },
    "plancher": 0
  },
  "dirigeant . indépendant . conjoint collaborateur": {
    "question": "Avez-vous un conjoint collaborateur ?",
    "description": "Permet au conjoint du dirigeant d'être couvert par la protection sociale moyennant le paiement de cotisations sociales supplémentaires.\nPour en bénéficier, l'époux(se) ou partenaire de Pacs du dirigeant doit:\n- exercer une activité professionnelle régulière et habituelle dans l'entreprise\n- faire l'objet d'une mention au RCS pour les commerçants ou au répertoire des métiers (RM) pour les artisans\n- ne pas être rémunéré\n- ne pas être associé de la société.\n",
    "par défaut": "non",
    "références": {
      "secu-independants.fr": "https://www.secu-independants.fr/cotisations/conjoint/conjoint-collaborateur/?reg=lorraine&pro=artisan&act=retraite&ae=non#c46535",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33429"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . non déductibles": {
    "titre": "Cotisations et contributions non déductibles fiscalement",
    "somme": [
      "CSG et CRDS . non déductible",
      "cotisations facultatives . non déductibles"
    ]
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ACRE": {
    "applicable si": "entreprise . ACRE",
    "formule": {
      "produit": {
        "assiette": {
          "somme": [
            "maladie",
            "retraite de base",
            "indemnités journalières maladie",
            "invalidité et décès",
            "allocations familiales"
          ]
        },
        "taux": "taux",
        "facteur": "prorata sur l'année"
      },
      "arrondi": "oui"
    },
    "références": {
      "Fiche secu-independants.fr": "https://www.secu-independants.fr/cotisations/calcul-cotisations/acre/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . PSS proratisé": {
    "titre": "plafond de la sécurité sociale proratisé",
    "description": "Le plafond de la sécurité sociale, proratisé par la durée d'activité pendant l'année (dans le cas d'activité crée ou cessée en cours d'année).\n\nUtile pour calculer les cotisations forfaitaires de début d'activité ou le montant de l'ACRE\n",
    "formule": {
      "unité": "€/an",
      "produit": {
        "assiette": "plafond sécurité sociale temps plein",
        "taux": {
          "valeur": "entreprise . durée d'activité . en fin d'année / 1 an",
          "plafond": "100%"
        }
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ACRE . prorata sur l'année": {
    "description": "Comme le calcul des cotisations indépendants s'effectue sur l'année entière,\nl'exonération est proratisée en fonction de la durée effective de l'ACRE sur l'année courante.\n\nPar exemple, pour une entreprise crée le 1 fevrier 2018, le calcul du prorata pour les\ncotisations 2019 sera le suivant :\n\n`31 jours d'acre restant en 2019 / 365 jours = 8,5%`\n",
    "formule": "(1 an - entreprise . durée d'activité . en début d'année) / 1 an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ACRE . taux": {
    "formule": {
      "taux progressif": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "PSS proratisé",
        "tranches": [
          {
            "taux": "100%",
            "plafond": "75%"
          },
          {
            "taux": "0%",
            "plafond": "100%"
          }
        ]
      }
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette": {
    "question": "Sur quelle base le conjoint cotise-t'il ?",
    "description": "Le conjoint collaborateur dispose de trois choix d’assiette pour le calcul de ces cotisations :\n- 1/3 du Plafond de Sécurité Sociale\n- Option sur le revenu du chef avec partage ( ½ ou 1/3)\n- Option sur le revenu du chef sans partage ( ½ ou 1/3)\n",
    "par défaut": "'forfaitaire'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "forfaitaire",
          "revenu sans partage",
          "revenu avec partage"
        ]
      }
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . forfaitaire": {
    "titre": "assiette forfaitaire",
    "description": "Le conjoint collaborateur paiera des cotisations équivalentes à un revenu\nprofessionnel forfaitaire, fixé à 1/3 du plafond de la sécurité sociale,\nà l’exception de la cotisation indemnités journalières qui est calculée sur\nune assiette équivalente à 40% du PASS.\n",
    "formule": "assiette = 'forfaitaire'"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . revenu avec partage": {
    "description": "Le conjoint collaborateur et le gérant paieront des cotisations sociales chacun sur une part du revenu professionnel.\n**Cette option baisse le montant des cotisations à payer pour le gérant, mais elle diminue également ses contreparties sociales (pension de retraite, indemnité décès, etc)**\n",
    "formule": "assiette = 'revenu avec partage'",
    "remplace": {
      "règle": "assiette des cotisations",
      "par": "assiette des cotisations - cotisations . assiette",
      "dans": [
        "cotisations et contributions . retraite de base",
        "cotisations et contributions . retraite complémentaire",
        "cotisations et contributions . invalidité et décès"
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . revenu sans partage": {
    "description": "Le conjoint collaborateur paiera des cotisations sociales calculées sur une base d'un pourcentage du assiette des cotisations du gérant de l'entreprise (un tiers ou la moitié).",
    "formule": "assiette = 'revenu sans partage'"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . pourcentage": {
    "question": "À quelle proportion du revenu le conjoint cotise-t'il ?",
    "par défaut": "'tiers'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "tiers",
          "moitié"
        ]
      }
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . pourcentage . tiers": {
    "formule": "pourcentage = 'tiers'",
    "titre": "1/3"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . pourcentage . moitié": {
    "formule": "pourcentage = 'moitié'",
    "titre": "1/2"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . assiette": {
    "titre": "assiette conjoint collaborateur",
    "unité": "€/an",
    "produit": {
      "assiette": "assiette des cotisations",
      "taux": "1 / 3",
      "variations": [
        {
          "si": "assiette . forfaitaire",
          "alors": {
            "assiette": "plafond sécurité sociale temps plein"
          }
        },
        {
          "si": "assiette . pourcentage . moitié",
          "alors": {
            "taux": "50%"
          }
        },
        {
          "sinon": "oui"
        }
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations": {
    "titre": "Cotisations conjoint collaborateur",
    "formule": {
      "somme": [
        "retraite de base",
        "retraite complémentaire",
        "invalidité et décès",
        "indemnités journalières maladie"
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . assiette retraite": {
    "le maximum de": [
      "cotisations . assiette",
      "5.25% * plafond sécurité sociale temps plein",
      "200 heures/an * SMIC horaire"
    ],
    "unité": "€/an",
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite de base": {
    "unité": "€/an",
    "barème": {
      "assiette": "assiette retraite",
      "multiplicateur": "plafond sécurité sociale temps plein",
      "tranches": [
        {
          "taux": "17.75%",
          "plafond": 1
        },
        {
          "taux": "0.6%"
        }
      ]
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite complémentaire": {
    "unité": "€/an",
    "barème": {
      "assiette": "retraite complémentaire . assiette",
      "tranches": [
        {
          "taux": "7%",
          "plafond": "cotisations et contributions . retraite complémentaire . plafond"
        },
        {
          "taux": "8%",
          "plafond": "4 * plafond sécurité sociale temps plein"
        }
      ]
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite complémentaire . assiette": {
    "titre": "assiette retraite complémentaire",
    "unité": "€/an",
    "valeur": "assiette retraite",
    "plafond": {
      "variations": [
        {
          "si": "entreprise . activité = 'artisanale'",
          "alors": "4 * plafond sécurité sociale temps plein"
        },
        {
          "sinon": "3 * plafond sécurité sociale temps plein"
        }
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . invalidité et décès . assiette": {
    "titre": "assiette invalidité et décès",
    "formule": {
      "le maximum de": [
        "cotisations . assiette",
        "20% * plafond sécurité sociale temps plein"
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . invalidité et décès": {
    "unité": "€/an",
    "produit": {
      "assiette": "assiette",
      "taux": "1.3%",
      "plafond": "plafond sécurité sociale temps plein"
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . indemnités journalières maladie": {
    "produit": {
      "assiette": {
        "valeur": "40% * plafond sécurité sociale temps plein",
        "unité": "€/an"
      },
      "taux": "cotisations et contributions . indemnités journalières maladie . taux"
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . cotisations et contributions . cotisations": {
    "références": {
      "assiettes et taux": "https://www.secu-independants.fr/baremes/cotisations-et-contributions"
    },
    "formule": {
      "somme": [
        "maladie",
        "retraite de base",
        "retraite complémentaire",
        "indemnités journalières maladie",
        "invalidité et décès",
        "allocations familiales",
        "PCV",
        "(- exonérations)"
      ]
    }
  },
  "dirigeant . indépendant . cotisations et contributions": {
    "titre": "cotisations et contributions sociales",
    "description": "C'est le montant total dû par l'indépendant au titre des cotisations et\ncontributions obligatoires ainsi qu'au titre de ses cotisations facultatives\ntelles que les contrats Madelin.\n",
    "somme": [
      "cotisations et contributions . cotisations",
      "conjoint collaborateur . cotisations",
      "cotisations facultatives . total",
      "CSG et CRDS",
      "contributions spéciales",
      "formation professionnelle"
    ],
    "note": "À la différence des cotisations, les contributions ne sont pas réintroduites\npour le calcul de la CSG/CRDS. Elles ne bénéficient pas non plus de la\nréduction ACRE.\n"
  },
  "dirigeant . indépendant . assiette minimale": {
    "non applicable si": "situation personnelle . RSA",
    "valeur": "oui",
    "description": "Si le revenu du chef d'entreprise est déficitaire ou inférieur aux bases de calcul, certaines cotisations seront portées à un montant minimum.\nLes cotisations pour les indemnités journalières, retraite de base, invalidité-décès et pour la formation ne sont plus calculées selon le revenu du chef d'entreprise mais selon une \"assiette\" (montant retenu qui sert de base au calcul d'un impôt ou d'une taxe).\n\nLes cotisations minimales ne s'appliquent pas si vous bénéficiez du RSA ou de la prime d’activité.\n",
    "références": {
      "cotisations minimales": "https://www.secu-independants.fr/cotisations/calcul-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . assiette minimale . maladie": {
    "titre": "assiette minimale maladie",
    "description": "Si le revenu du chef d'entreprise est déficitaire ou inférieur aux bases de calcul, certaines cotisations seront portées à un montant minimum.\n",
    "produit": {
      "assiette": "plafond sécurité sociale temps plein",
      "taux": "40%"
    },
    "unité": "€/an",
    "arrondi": "oui",
    "références": {
      "cotisations minimales": "https://www.secu-independants.fr/cotisations/calcul-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . assiette minimale . retraite": {
    "titre": "assiette minimale retraite",
    "description": "La cotisation minimale de retraite de base permet de valider 3 trimestres de retraite, quel que soit le revenu.",
    "produit": {
      "assiette": "plafond sécurité sociale temps plein",
      "taux": "11.5%"
    },
    "unité": "€/an",
    "arrondi": "oui",
    "références": {
      "cotisations minimales": "https://www.secu-independants.fr/cotisations/calcul-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . contributions spéciales": {
    "description": "Certains régimes spéciaux peuvent ajouter des contributions additionnelles\n(par exemple, la CURPS pour les CPAM)\n",
    "formule": "non"
  },
  "dirigeant . indépendant . cotisations et contributions . PCV": {
    "titre": "Prestations complémentaires vieillesse",
    "acronyme": "PCV",
    "formule": "non",
    "description": "Certaines catégories professionnelles bénéficient de\nprestations complémentaires vieillesse (PCV), auparavant nommées « avantage\nsocial vieillesse » (ASV). Cela concerne les médecins généralistes, les\nchirurgiens-dentistes, les sages-femmes, les auxiliaires médicaux et les\ndirecteurs de laboratoires. Ce régime résulte de la prise en charge\npartielle par l’Assurance maladie de leurs cotisations d’assurance\nvieillesse sous réserve qu’ils aient exercé leur activité dans le cadre\nconventionnel.\n"
  },
  "dirigeant . indépendant . cotisations et contributions . déduction tabac": {
    "applicable si": "entreprise . activité . débit de tabac",
    "question": "Quel est le montant des revenus issus de la vente de tabac que vous souhaitez exonérer de cotisation vieillesse ?",
    "description": "Si vous exercez une activité de débit de tabac simultanément à une activité commerciale, vous avez la possibilité d’opter pour le calcul de votre cotisation d’assurance vieillesse sur le seul revenu tiré de votre activité commerciale (en effet, les remises pour débit de tabac sont soumises par ailleurs à un prélèvement vieillesse particulier). Nous attirons cependant votre attention sur le fait qu’en cotisant sur une base moins importante, excluant les revenus de débit de tabac, vos droits à retraite pour l’assurance vieillesse des commerçants en seront diminués.\n",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations et contributions . déduction tabac . revenus déduits": {
    "titre": "assiette des cotisations (avec déduction tabac)",
    "applicable si": "déduction tabac",
    "remplace": {
      "règle": "assiette des cotisations",
      "dans": [
        "retraite de base",
        "retraite complémentaire",
        "invalidité et décès",
        "conjoint collaborateur"
      ]
    },
    "formule": {
      "valeur": "assiette des cotisations",
      "abattement": "déduction tabac"
    }
  },
  "dirigeant . indépendant . cotisations facultatives": {
    "question": "Avez-vous souscrit à des contrats de prévoyance et / ou de retraite complémentaire privés (contrats Madelin, plans d'épargne retraite) ?",
    "description": "Il est possible pour l'indépendant de souscrire à des contrats privés pour la complémentaire santé, ou un plan d'épargne retraite.\nLes versements à ces contrats sont désigné par l'appellation \"cotisations facultative\" par l'administration fiscale.\n\nIls sont déductible d'impôts (dans la limite d'un plafond), mais non déductible pour l'assiette des cotisations et contributions sociales.\n",
    "par défaut": "non",
    "références": {
      "Contrats Madelin": "https://www.economie.gouv.fr/particuliers/reduction-impot-revenu-investissements-entreprise-pme-madelin",
      "PER": "https://www.economie.gouv.fr/PER-epargne-retraite"
    }
  },
  "dirigeant . indépendant . cotisations facultatives . total": {
    "titre": "Total des cotisations facultatives",
    "somme": [
      "contrats madelin",
      "PER"
    ]
  },
  "dirigeant . indépendant . cotisations facultatives . déductibles": {
    "titre": "Part des cotisations facultatives déductible fiscalement",
    "formule": {
      "somme": [
        {
          "valeur": "contrats madelin . prévoyance",
          "plafond": "plafond prévoyance"
        },
        {
          "somme": [
            "PER",
            "contrats madelin . retraite"
          ],
          "plafond": "plafond retraite complémentaire"
        }
      ]
    }
  },
  "dirigeant . indépendant . cotisations facultatives . non déductibles": {
    "titre": "Part des cotisations facultatives non déductible fiscalement",
    "formule": "total - déductibles"
  },
  "dirigeant . indépendant . cotisations facultatives . PER": {
    "description": "Le PER individuel est ouvert à tous. Vous pouvez le souscrire auprès d'un établissement financier ou d'un organisme d'assurance. Ce nouveau plan succède au PERP et au contrat Madelin, qui ne seront plus proposés à partir du 1er octobre 2020. Votre épargne accumulée sur le Perp et le Madelin peut être à votre demande transférée sur le PER individuel. Ce contrat donne droit à des avantages fiscaux et vos droits sont transférables vers les autres PER. Il y a des cas de déblocage anticipé.",
    "titre": "Plan d'épargne retraite",
    "unité": "€/an",
    "question": "Quel est le montant des cotisations que vous versez dans le cadre d'un PER (nouveau plan épargne retraite, depuis le 1er octobre 2019) ?",
    "par défaut": "0 €/mois",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F34982",
      "Fiche economie.gouv.fr": "https://www.economie.gouv.fr/PER-epargne-retraite"
    }
  },
  "dirigeant . indépendant . cotisations facultatives . contrats madelin": {
    "titre": "Somme des cotisations à contrats Madelin",
    "somme": [
      "prévoyance",
      "retraite"
    ]
  },
  "dirigeant . indépendant . cotisations facultatives . contrats madelin . prévoyance": {
    "titre": "Souscription à un contrat de prévoyance complémentaire Madelin",
    "question": "Quel est le montant que vous versez pour vos contrats Madelin de prévoyance complémentaire (santé, perte d'emploi subie) ?",
    "unité": "€/an",
    "description": "Si vous cotisez au titre d'un contrat de prévoyance complémentaire (santé, perte d'emploi subie)\nde type loi Madelin, vous pouvez déduire ces cotisations des bénéfices\nimposables que vous déclarez pour votre activité non salariée.\n",
    "références": {
      "Fiche impôts": "https://www.impots.gouv.fr/portail/particulier/questions/je-cotise-un-contrat-madelin-quel-est-mon-avantage-fiscal",
      "Bofip (contrats d'assurance de groupe)": "https://bofip.impots.gouv.fr/bofip/4639-PGP.html",
      "Article de loi": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029042287&cidTexte=LEGITEXT000006069577&dateTexte=20140530&fastReqId=1900907951&nbResultRech=1"
    },
    "par défaut": "50 €/mois"
  },
  "dirigeant . indépendant . cotisations facultatives . plafond prévoyance": {
    "unité": "€/an",
    "formule": {
      "somme": [
        {
          "produit": {
            "assiette": "revenu professionnel",
            "taux": "3.75%"
          }
        },
        {
          "produit": {
            "assiette": "plafond sécurité sociale temps plein",
            "taux": "7%"
          }
        }
      ],
      "plafond": {
        "produit": {
          "assiette": "8 * plafond sécurité sociale temps plein",
          "taux": "3%"
        }
      }
    },
    "références": {
      "Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029042287&cidTexte=LEGITEXT000006069577&dateTexte=20140530",
      "Réassurez-moi": "https://reassurez-moi.fr/guide/pro/tns/plafond#le_plafond_de_deduction_madelin_pour_une_mutuelle_santenbsp"
    },
    "note": "Normalement c'est le résultat fiscal qui devrait être utilisé pour l'assiette du plafond, mais on utilise le revenu professionnel pour éviter un cycle.\n"
  },
  "dirigeant . indépendant . cotisations facultatives . contrats madelin . retraite": {
    "titre": "Souscription à une retraite Madelin",
    "question": "Quel est le montant que vous versez pour votre contrat Madelin retraite complémentaire ?",
    "description": "Si vous cotisez au titre d'un contrat retraite de type loi Madelin,\nvous pouvez déduire une partie de ces cotisations des bénéfices\nimposables que vous déclarez pour votre activité non salariée.\n",
    "références": {
      "Fiche impôts": "https://www.impots.gouv.fr/portail/particulier/questions/je-cotise-un-contrat-madelin-quel-est-mon-avantage-fiscal",
      "Bofip (contrats d'assurance de groupe)": "https://bofip.impots.gouv.fr/bofip/4639-PGP.html",
      "Article de loi": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029042287&cidTexte=LEGITEXT000006069577&dateTexte=20140530&fastReqId=1900907951&nbResultRech=1"
    },
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations facultatives . plafond retraite complémentaire": {
    "unité": "€/an",
    "formule": {
      "le maximum de": [
        {
          "barème": {
            "assiette": "revenu professionnel",
            "multiplicateur": "plafond sécurité sociale temps plein",
            "tranches": [
              {
                "taux": "10%",
                "plafond": 1
              },
              {
                "taux": "25%",
                "plafond": 8
              }
            ]
          }
        },
        {
          "produit": {
            "assiette": "plafond sécurité sociale temps plein",
            "taux": "10%"
          }
        }
      ]
    },
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/1124-PGP.html",
      "LegiFiscal": "https://www.legifiscal.fr/impots-personnels/impot-revenu/deduction-des-contrats-madelin-retraite.html"
    },
    "note": "Normalement c'est le résultat fiscal qui devrait être utilisé pour l'assiette du plafond, mais on utilise le revenu professionnel pour éviter un cycle.\n"
  },
  "dirigeant . indépendant . cotisations et contributions . début activité": {
    "titre": "Cotisations forfaitaires de début d'activité",
    "description": "Lorsque vous commencez votre activité, vos **revenus professionnels\nn’étant pas connus**, les cotisations et contributions des deux premières\nannées sont calculées sur une **base forfaitaire**.\n\n\nCes cotisations seront ajustées et régularisées en fonction de vos revenus réels de\nl’année d’exercice. Si votre revenu est supérieur à la base forfaitaire prise en compte\npour le calcul des cotisations provisionnelles alors vous serez redevable d’un **complément\nde cotisations**.\n\n\nCe simulateur calcule les cotisations dites définitives sur la base des revenus réels de votre\nactivité. Il vous permet donc de pouvoir anticiper le montant de cette régularisation et de\n**planifier votre trésorerie** en conséquence.\n",
    "note": "La base forfaitaire s’élève à **19 % du plafond annuel de la Sécurité sociale** au titre de la première et de la deuxième année d’activité (à l’exception de la cotisation Maladie et indemnités journalières pour lesquelles l’assiette forfaitaire est égale à 40% du plafond annuel de la Sécurité sociale).",
    "applicable si": "entreprise . date de création >= 01/01/2020",
    "unité": "€/an",
    "recalcul": {
      "règle": "cotisations et contributions",
      "avec": {
        "maladie . taux progressif . assiette": "40% * plafond sécurité sociale temps plein",
        "assiette des cotisations": "assiette forfaitaire",
        "CSG et CRDS . assiette": "assiette forfaitaire",
        "dirigeant . indépendant . cotisations facultatives": "non"
      }
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/lajustement-et-la-regularisation.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . début activité . assiette forfaitaire": {
    "produit": {
      "assiette": "PSS proratisé",
      "taux": "19%"
    },
    "unité": "€/an",
    "arrondi": "oui",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/les-cotisations-provisionnelles/debut-dactivite.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . régularisation": {
    "titre": "Comment fonctionne la régularisation des cotisations provisionnelles",
    "description": "Les cotisations et contributions sont calculées à titre provisionnel\nsur la base du dernier revenu déclaré\n(ou du montat forfaitaire, si aucun revenu n'est encore déclaré).\nUne fois l'année écoulée et le revenu professionnel connu,\nles cotisations et contributions sont régularisées.\n\n\nCe simulateur calcule les cotisations **après régularisation**.\nIl vous permet donc d'anticiper le montant de cette régularisation et de planifier votre\ntrésorerie en conséquence.\n\n\nSi vos revenus d'activité changent beaucoup par rapport à l'année précédente,\nvous avez la possibilité de communiquer à l'URSSAF un\n**montant prévisionnel pour l'année en cours, qui sera pris comme base de calcul**\n(attention cependant, vous serez tenus de faire une estimation précise).\n",
    "valeur": "oui",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/cms/render/live/fr/sites/urssaf/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/les-cotisations-provisionnelles/demande-de-modulation.html",
      "Article L131-6-2 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037062224/",
      "Article D131-3 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000038786941/2021-03-01/?isSuggest=true"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . indemnités journalières maladie": {
    "synonyme": "maladie 2",
    "description": "Cotisations pour les indemnités journalières des indépendants. Si l'état de\nsanté des artisans, commerçants, industriels et conjoints collaborateurs\nnécessite un arrêt de travail, une part de leur ancien revenu leur sera\nversé.\n",
    "produit": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . maladie",
        "plafond": "5 * plafond sécurité sociale temps plein"
      },
      "taux": {
        "nom": "taux",
        "valeur": "0.85%"
      }
    },
    "arrondi": "oui",
    "références": {
      "Cotisation minimale": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/cotisations-minimales/",
      "Taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . maladie": {
    "barème": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . maladie"
      },
      "multiplicateur": "plafond sécurité sociale temps plein",
      "tranches": [
        {
          "taux": {
            "valeur": "taux progressif",
            "arrondi": "2 décimales"
          },
          "plafond": "110%"
        },
        {
          "taux": "6.35%",
          "plafond": 5
        },
        {
          "taux": "6.5%"
        }
      ]
    },
    "arrondi": "oui",
    "références": {
      "décret formule de calcul": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000036342439&categorieLien=id",
      "taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/"
    },
    "note": "On retrouve dans le décret ci-dessous la phrase suivante :\n\n> I.-Par dérogation au premier alinéa, le taux de la cotisation est fixé à 6,5 % lorsque le revenu d'activité est supérieur à cinq fois la valeur annuelle du plafond de la sécurité sociale déterminée conformément à l'article D. 613-2.\n\nLe terme \"lorsque\" laisse entendre qu'en cas de dépassement du seuil 5xPSS, tout le revenu est soumis à 6.5%. Il semblerait qu'une interprétation inverse soit à privilégier : seule la part supérieure à ce seuil est soumise à ce taux, et c'est cette implémentation que nous avons retenue.\n"
  },
  "dirigeant . indépendant . cotisations et contributions . maladie . taux progressif . réduction supplémentaire": {
    "description": "La réduction supplémentaire du taux maladie pour les revenu inférieurs à 40% du plafond de la sécurité sociale\n",
    "non applicable si": "situation personnelle . RSA",
    "remplace": {
      "règle": "taux progressif",
      "par": "taux progressif - réduction supplémentaire"
    },
    "taux progressif": {
      "assiette": "assiette",
      "multiplicateur": "plafond sécurité sociale temps plein",
      "tranches": [
        {
          "plafond": "0%",
          "taux": "1.35%"
        },
        {
          "plafond": "40%",
          "taux": "0%"
        }
      ]
    },
    "références": {
      "Taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/",
      "décret formule de calcul": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000036342439&categorieLien=id"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . maladie . taux progressif": {
    "taux progressif": {
      "assiette": {
        "nom": "assiette",
        "valeur": "assiette des cotisations"
      },
      "multiplicateur": "plafond sécurité sociale temps plein",
      "tranches": [
        {
          "plafond": "0%",
          "taux": "1.35%"
        },
        {
          "plafond": "110%",
          "taux": "6.35%"
        }
      ]
    },
    "références": {
      "Taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/",
      "décret formule de calcul": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000036342439&categorieLien=id"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . retraite de base": {
    "barème": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . retraite"
      },
      "multiplicateur": "plafond sécurité sociale temps plein",
      "tranches": [
        {
          "taux": "17.75%",
          "plafond": 1
        },
        {
          "taux": "0.6%"
        }
      ]
    },
    "arrondi": "oui",
    "références": {
      "Cotisation minimale": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . retraite complémentaire": {
    "barème": {
      "assiette": "assiette des cotisations",
      "tranches": [
        {
          "taux": "7%",
          "plafond": {
            "nom": "plafond",
            "acronyme": "PRCI",
            "titre": "plafond retraite complémentaire des indépendants",
            "valeur": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": "38916 €/an"
                },
                {
                  "si": "année = 2021",
                  "alors": "38493 €/an"
                }
              ]
            }
          }
        },
        {
          "taux": "8%",
          "plafond": "4 * plafond sécurité sociale temps plein"
        }
      ]
    },
    "arrondi": "oui",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations/artisans-commercants-et-professi/bases-de-calcul-et-taux-des-coti.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . invalidité et décès": {
    "formule": {
      "produit": {
        "assiette": {
          "valeur": "assiette des cotisations",
          "plancher": "assiette minimale . retraite",
          "plafond": "plafond sécurité sociale temps plein"
        },
        "taux": "1.3%"
      },
      "arrondi": "oui"
    },
    "références": {
      "Cotisation minimale": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . CSG et CRDS": {
    "formule": {
      "produit": {
        "assiette": "assiette",
        "composantes": [
          {
            "attributs": {
              "nom": "non déductible",
              "arrondi": "oui"
            },
            "composantes": [
              {
                "taux": {
                  "nom": "taux",
                  "valeur": "2.9%"
                }
              },
              {
                "attributs": {
                  "nom": "revenus de remplacement"
                },
                "assiette": "dirigeant . indépendant . IJSS . total",
                "taux": "non déductible . taux"
              }
            ]
          },
          {
            "attributs": {
              "nom": "déductible",
              "arrondi": "oui"
            },
            "composantes": [
              {
                "taux": {
                  "nom": "taux",
                  "valeur": "6.8%"
                }
              },
              {
                "attributs": {
                  "nom": "revenus de remplacement"
                },
                "assiette": "dirigeant . indépendant . IJSS . total",
                "taux": "3.8%"
              }
            ]
          }
        ]
      }
    },
    "références": {
      "fiche Urssaf": "https://www.urssaf.fr/portail/home/indépendant/mes-cotisations/quelles-cotisations/les-contributions-csg-crds/taux-de-la-csg-crds.html",
      "IJSS (amelie.fr)": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie",
      "IJSS (service-public.fr)": "https://www.service-public.fr/particuliers/vosdroits/F2971",
      "Article 154 quiquies du Code Général des Impôts": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038836652/"
    }
  },
  "dirigeant . indépendant . revenus étrangers": {
    "description": "Les revenus étrangers sont des revenus déclarés par les travailleurs indépendants pour des revenus perçus au titre de l’exercice d’une activité non salariée dans un autre Etat de l’UE, EEE ou en Suisse à l’étranger.\nCes revenus ne sont soumis qu’aux cotisations et sont intégrés à l’assiette sociale. Par contre, ces revenus sont identifiés spécifiquement afin de les déduire de l’assiette de la CSG/CRDS.\nPour savoir si ces revenus sont soumis à l'impôt sur le revenu, référez-vous à la notice explicative sur le site [impots.gouv.fr](https://www.impots.gouv.fr/portail/international-particulier/imposition-des-revenus-de-source-etrangere)\n",
    "question": "Avez-vous perçu des revenus à l'étranger dans le cadre de votre activité ?",
    "par défaut": "non"
  },
  "dirigeant . indépendant . revenus étrangers . montant": {
    "titre": "revenus perçu à l'étranger",
    "question": "Quel est leur montant ?",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations et contributions . CSG et CRDS . assiette": {
    "note": "Seule la partie imposable des IJSS est retranchée de l'assiette de la CSG, puisque la partie non imposable a déjà été retranchée du revenu net fiscal fourni",
    "valeur": {
      "somme": [
        "assiette des cotisations . sans plancher",
        "cotisations",
        "conjoint collaborateur . cotisations"
      ]
    },
    "abattement": {
      "somme": [
        "revenus étrangers . montant",
        "dirigeant . indépendant . IJSS . imposable"
      ]
    },
    "plancher": "0 €/mois"
  },
  "dirigeant . indépendant . cotisations et contributions . formation professionnelle": {
    "acronyme": "CFP",
    "produit": {
      "assiette": "plafond sécurité sociale temps plein",
      "taux": {
        "variations": [
          {
            "si": "entreprise . activité = 'artisanale'",
            "alors": "0.29%"
          },
          {
            "si": "conjoint collaborateur",
            "alors": "0.34%"
          },
          {
            "sinon": "0.25%"
          }
        ]
      }
    },
    "unité": "€/an",
    "arrondi": "oui",
    "note": "Le taux n'est pas majoré pour les artisans avec conjoint collaborateur",
    "références": {
      "fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23459",
      "fiche Urssaf": "https://www.urssaf.fr/portail/home/indépendant/mes-cotisations/quelles-cotisations/la-contribution-a-la-formation-p/base-de-calcul-et-taux-de-la-con.html",
      "brève Urssaf pour les artisans": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-indépendant/transfert-du-recouvrement-de-la.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . allocations familiales": {
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": {
          "nom": "taux",
          "taux progressif": {
            "assiette": "assiette des cotisations",
            "multiplicateur": "plafond sécurité sociale temps plein",
            "tranches": [
              {
                "plafond": "110%",
                "taux": "0%"
              },
              {
                "plafond": "140%",
                "taux": "3.1%"
              }
            ]
          }
        }
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations": {
    "formule": {
      "somme": [
        "ZFU",
        "ACRE"
      ]
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ZFU": {
    "applicable si": "établissement . ZFU",
    "produit": {
      "assiette": "maladie",
      "taux": "taux",
      "plafond": {
        "recalcul": {
          "avec": {
            "revenu professionnel": "3042 heures/an * SMIC horaire"
          }
        }
      }
    },
    "arrondi": "oui",
    "unité": "€/an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . âge": {
    "question": "Bénéficiez-vous du dispositif d'exonération \"âge\"",
    "description": "Ce dispositif a été arrêté en 2015, mais est toujours actif pour les personnes qui en bénéficiait avant son abbrogation.",
    "par défaut": "non",
    "applicable si": "entreprise . date de création < 01/2016",
    "rend non applicable": "invalidité et décès"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . invalidité": {
    "question": "Êtes-vous titulaire d’une pension d’invalidité à titre de travailleur indépendant ?",
    "description": "Les personnes titulaires d’une pension d’invalidité versée par un régime des travailleurs non-salariés non agricoles bénéficient d’une exonération totale des cotisations maladie et retraite complémentaire.",
    "par défaut": "non",
    "rend non applicable": [
      "exonérations . ZFU",
      "maladie",
      "indemnités journalières maladie",
      "retraite complémentaire"
    ]
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ZFU . taux": {
    "titre": "taux exonération ZFU",
    "formule": {
      "taux progressif": {
        "assiette": "établissement . ZFU . durée d'implantation en fin d'année",
        "retourne seulement le taux": "oui",
        "variations": [
          {
            "si": "entreprise . effectif < 5",
            "alors": {
              "tranches": [
                {
                  "plafond": "5 ans",
                  "taux": "100%"
                },
                {
                  "plafond": "6 ans",
                  "taux": "60%"
                },
                {
                  "plafond": "10 ans",
                  "taux": "60%"
                },
                {
                  "plafond": "11 ans",
                  "taux": "40%"
                },
                {
                  "plafond": "12 ans",
                  "taux": "40%"
                },
                {
                  "plafond": "13 ans",
                  "taux": "20%"
                },
                {
                  "plafond": "14 ans",
                  "taux": "20%"
                },
                {
                  "plafond": "15 ans",
                  "taux": "0%"
                }
              ]
            }
          },
          {
            "sinon": {
              "tranches": [
                {
                  "plafond": "5 ans",
                  "taux": "100%"
                },
                {
                  "plafond": "6 ans",
                  "taux": "60%"
                },
                {
                  "plafond": "7 ans",
                  "taux": "40%"
                },
                {
                  "plafond": "8 ans",
                  "taux": "20%"
                },
                {
                  "plafond": "9 ans",
                  "taux": "0%"
                }
              ]
            }
          }
        ]
      }
    }
  },
  "dirigeant . indépendant . cotisations et contributions . maladie domiciliation fiscale étranger": {
    "applicable si": "situation personnelle . domiciliation fiscale à l'étranger",
    "titre": "Maladie (domiciliation fiscale à l'étranger)",
    "description": "En contrepartie de l'exonération de CSG, les cotisants ont un taux maladie plus elevé. Contrairement aux autres assurés commerçants/artisans ils ne bénéficient pas de la réduction du taux de la cotisation maladie en fonction du revenu déclaré.",
    "remplace": "maladie",
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": "14.5%"
      }
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . IJSS": {
    "titre": "indemnités journalières de sécurité sociale",
    "description": "En cas de maladie, maternité, ou accident, y compris suite à un arrêt de travail ou un arrêt pour garde d’enfant en lien avec l’épidémie du Covid-19, le régime général de Sécurité sociale assure le versement de prestations « en espèces ».\nCe sont les indemnités journalières de Sécurité sociale (IJSS).\nLes indemnités complémentaires aux indemnités journalières de la Sécurité sociale versées dans le cadre d’un contrat de prévoyance ne constituent pas des revenus de remplacement.\nNote: Les prestations d’invalidité versées par les régimes d’invalidité-décès ne sont pas concernées",
    "question": "Avez-vous perçu des indemnités journalières de maladie, maternité ou paternité au titre de votre activité indépendante ?",
    "par défaut": "non"
  },
  "dirigeant . indépendant . IJSS . total": {
    "titre": "indemnités journalières",
    "question": "Quel est le montant total brut de toutes vos indemnités journalières ?",
    "description": "Indiquez uniquement le montant brut de vos revenus de remplacement, imposables et non imposables qui figure sur le relevé de prestations fourni pas votre caisse d'assurance maladie.\n> Les revenus de remplacement sont : l'allocation forfaitaire de repos maternel, l'indemnité journalière forfaitaire d'interruption d'activité, l'indemnité de remplacement pour maternité, paternité ou adoption et l'indemnité journalière maladie.",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . IJSS . imposable": {
    "titre": "indemnités journalières imposable",
    "résumé": "Uniquement si vous ne relevez pas du régime micro-fiscal",
    "question": "Quel est le montant brut des indemnités journalières imposables perçues?",
    "description": "Indiquez uniquement les revenus de remplacement imposables perçus, donc tous les revenus de remplacement perçus **sauf les indemnités journalières en lien avec une Affection de Longue Durée (ALD)**.\n\nCes revenus seront déduits de votre assiette des contributions, afin de ne pas être soumis deux fois à la CSG-CRDS :\n> Les revenus de remplacement sont : l'allocation forfaitaire de repos maternel, l'indemnité journalière forfaitaire d'interruption d'activité, l’indemnité de remplacement pour maternité, paternité ou adoption et l'indemnité journalière maladie.",
    "par défaut": "0 €/an"
  },
  "entreprise": {
    "valeur": "oui",
    "description": "Le contrat lie une entreprise, identifiée par un code SIREN, et un employé.\n"
  },
  "entreprise . date de création": {
    "question": "Quelle est votre date de début d'activité ?",
    "par défaut": "01/01/2021",
    "description": "La date de début d'activité (ou date de création) est fixée lors de la\ndéclaration de votre entreprise.\n\nVous pouvez [renseigner votre entreprise](/gérer), pour préremplir\nautomatiquement cette information.\n\nSi vous n'avez pas le jour exact, le mois suffit en général pour une bonne\napproximation.\n",
    "suggestions": {
      "Début 2022": "01/01/2022",
      "Début 2021": "01/01/2021",
      "Il y a 10 ans": "01/01/2012"
    },
    "type": "date"
  },
  "entreprise . date de création . contrôle date future": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "date de création > 01/2025",
    "description": "Nous ne pouvons voir aussi loin dans le futur"
  },
  "entreprise . date de création . contrôle date passée": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "date de création < 01/1900",
    "description": "Il s'agit d'une très vieille entreprise ! Êtes-vous sûr de ne pas vous être trompé dans la saisie ?"
  },
  "entreprise . durée d'activité": {
    "formule": {
      "durée": {
        "depuis": "date de création"
      }
    }
  },
  "entreprise . durée d'activité . en fin d'année": {
    "titre": "durée d'activité à la fin de l'année",
    "formule": {
      "somme": [
        {
          "durée": {
            "depuis": "date de création",
            "jusqu'à": "période . fin d'année"
          }
        },
        "1 jour"
      ]
    }
  },
  "entreprise . durée d'activité . en début d'année": {
    "titre": "durée d'activité au début de l'année",
    "formule": {
      "durée": {
        "depuis": "date de création",
        "jusqu'à": "période . début d'année"
      }
    }
  },
  "entreprise . chiffre d'affaires": {
    "question": "Quel est votre chiffre d'affaires envisagé ?",
    "résumé": "Montant total des recettes brutes (hors taxe)",
    "unité": "€/an",
    "somme": [
      "dirigeant . rémunération . nette après impôt",
      "dirigeant . rémunération . impôt",
      "dirigeant . rémunération . cotisations",
      "charges",
      {
        "applicable si": "entreprise . imposition . IS",
        "somme": [
          "imposition . IS . résultat net",
          "imposition . IS . impôt sur les sociétés"
        ]
      }
    ],
    "plancher": "0€/an",
    "arrondi": "oui",
    "identifiant court": "CA"
  },
  "entreprise . chiffre d'affaires . vente restauration hébergement": {
    "titre": "Vente de biens, restauration, hébergement (BIC)",
    "résumé": "Chiffre d'affaires hors taxe",
    "question": "Quel est le chiffre d'affaires issu de la vente de biens, restauration ou hébergement ?",
    "unité": "€/an",
    "variations": [
      {
        "si": "activité . mixte",
        "alors": {
          "produit": {
            "assiette": "chiffre d'affaires",
            "taux": "activité . mixte . proportions . vente restauration hébergement"
          }
        }
      },
      {
        "sinon": {
          "applicable si": "activité . service ou vente = 'vente'",
          "valeur": "chiffre d'affaires"
        }
      }
    ],
    "arrondi": "oui",
    "plancher": "0€/an",
    "description": "### Vente de biens\nIl s’agit du chiffre d'affaires de toutes les opérations comportant\ntransfert de propriété d'un bien corporel, c'est-à-dire un bien ayant une\nexistence matérielle.\n\n### Restauration et hébergement\nIl s’agit du chiffre d'affaires de toutes les opérations de restauration\nou hébergement\n\n> Note : pour les locations meublées, seules les locations de meublé de tourisme classé et de chambre d’hôte entrent dans cette catégorie hébergement ; les autres locations meublées relèvent de la catégorie « Prestations de service BIC »\n\nCes revenus sont imposables dans la catégorie des BIC\n",
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32919",
      "définition vente de bien (impots.gouv)": "https://www.impots.gouv.fr/portail/professionnel/achatvente-de-biens"
    }
  },
  "entreprise . chiffre d'affaires . service BIC": {
    "unité": "€/an",
    "plancher": "0€/an",
    "arrondi": "oui",
    "résumé": "Chiffre d'affaires hors taxe",
    "titre": "Prestations de service commerciales ou artisanales (BIC)",
    "question": "Quel est le chiffre d'affaires issu de prestations de service commerciales ou artisanales ?",
    "description": "Il s’agit de toute opération ne comportant pas de transfert de propriété de\nbiens corporels (c'est-à-dire ayant une existence matérielle), dont\nl'activité manuelle joue le principal rôle.\n\nPour simplifier on pourrait dire que ce sont toutes les prestations de\nservices qui nécessite plus qu'un ordinateur pour être effectuées.\n\n**Exemples** : transports, service à la personne, réparation etc.\n",
    "variations": [
      {
        "si": "activité . mixte",
        "alors": {
          "produit": {
            "assiette": "chiffre d'affaires",
            "taux": "activité . mixte . proportions . service BIC"
          }
        }
      },
      {
        "sinon": {
          "applicable si": "activité . service ou vente = 'service'",
          "valeur": "chiffre d'affaires"
        }
      }
    ],
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32919"
    }
  },
  "entreprise . chiffre d'affaires . service BNC": {
    "titre": "Autres prestations de service et activités libérales (BNC)",
    "résumé": "Recettes hors taxes",
    "question": "Quelles sont les recettes issues de l’activité libérale ?",
    "arrondi": "oui",
    "plancher": "0€/an",
    "description": "Ce sont toutes les opérations dont l'activité intellectuelle tient\nun rôle essentiel.\n\n**Exemples** : conseil, accompagnement, traduction, développement,\nformation, enseignement, sportif\n\nLes revenus tirés de ce chiffre d'affaires sont imposable au régime BNC (bénéfices non commerciaux)\n",
    "variations": [
      {
        "si": "activité . mixte",
        "alors": {
          "produit": {
            "assiette": "chiffre d'affaires",
            "taux": "activité . mixte . proportions . service BNC"
          }
        }
      },
      {
        "sinon": {
          "applicable si": "activité = 'libérale'",
          "valeur": "chiffre d'affaires"
        }
      }
    ],
    "références": {
      "liste des activités libérales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/liste-professions-liberales"
    }
  },
  "entreprise . chiffre d'affaires . service": {
    "titre": "Chiffre d'affaires de prestation de service",
    "description": "Il s’agit de toute opération ne comportant pas de transfert de propriété de\nbiens corporels (c'est-à-dire ayant une existence matérielle)\n",
    "unité": "€/an",
    "somme": [
      "service BIC",
      "service BNC"
    ]
  },
  "entreprise . chiffre d'affaires . BIC": {
    "description": "Le chiffre d'affaires correspondant au revenus imposable au titre des bénéfice industriels et commerciaux (BIC ou micro-BIC).\n",
    "unité": "€/an",
    "somme": [
      "service BIC",
      "vente restauration hébergement"
    ]
  },
  "entreprise . chiffre d'affaires . franchise de TVA": "oui",
  "entreprise . chiffre d'affaires . franchise de TVA . seuil vente": {
    "variations": [
      {
        "si": "établissement . localisation . outre-mer . Guadeloupe Réunion Martinique",
        "alors": "110000 €/an"
      },
      {
        "sinon": "94300 €/an"
      }
    ],
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F21746"
    }
  },
  "entreprise . chiffre d'affaires . franchise de TVA . seuil service": {
    "variations": [
      {
        "si": "établissement . localisation . outre-mer . Guadeloupe Réunion Martinique",
        "alors": "60000 €/an"
      },
      {
        "si": "dirigeant . indépendant . PL . métier = 'avocat'",
        "alors": "44500 €"
      },
      {
        "sinon": "36500 €/an"
      }
    ],
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F21746"
    }
  },
  "entreprise . chiffre d'affaires . franchise de TVA . dépassement": {
    "type": "notification",
    "formule": {
      "une de ces conditions": [
        "chiffre d'affaires > seuil vente + seuil service",
        "vente restauration hébergement > seuil vente",
        "service > seuil service"
      ]
    },
    "résumé": "Le seuil annuel de chiffre d'affaires pour la franchise de TVA est dépassé.\n",
    "description": "La franchise de TVA est un dispositif qui exonère les entreprises de la\ndéclaration et du paiement de la TVA. Il s'applique en dessous d'un seuil de\nchiffre d'affaire annuel dépendant de l'activité.\n\nLe professionnel qui relève de ce dispositif facture ses prestations ou ses\nventes en hors taxe, et ne peut pas déduire la TVA de ses achats.\n",
    "note": "On prend compte ici des seuils majorés (qui s'appliquent si le seuil \"minoré\" n'a pas été dépassé en année `n - 2`)\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F21746"
    }
  },
  "entreprise . résultat fiscal": {
    "unité": "€/an",
    "somme": [
      "chiffre d'affaires",
      "(- charges)",
      "(- charges . dirigeant)"
    ]
  },
  "entreprise . imposition": {
    "question": "Comment l'entreprise est-elle imposée ?",
    "description": "Indiquez si le régime d’imposition des revenus liés à l’activité indépendante relèvent :\n- de l’impôt sur le revenu : les bénéfices de l’entreprise sont imposés directement auprès du travailleur indépendant, au barème progressif de l’impôt sur le revenu.\n- de l’impôt sur les sociétés : les bénéfices de l’entreprise sont imposés au nom de la société, au taux de l’impôt sur les sociétés.\n",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "IR",
          "IS"
        ]
      }
    },
    "par défaut": "'IR'"
  },
  "entreprise . imposition . IR": {
    "valeur": "imposition = 'IR'",
    "titre": "Impôt sur le revenu"
  },
  "entreprise . imposition . IR . micro-fiscal": {
    "rend non applicable": "dirigeant . indépendant . cotisations facultatives",
    "question": "Avez-vous opté pour le régime micro-fiscal ?",
    "description": "Avec le régime micro fiscal, les charges déductibles sont estimées forfaitairement,en fonction d’un pourcentage du chiffre d’affaires. Ce pourcentage dépend du type d’activité : 71% pour les activités de vente, restauration et hébergement (location de meublé de tourisme classé et chambre d’hôte), 50% pour les prestations de service commerciales ou artisanales, 34% pour les activités libérales.\n\nCette option permet de simplifier votre comptabilité et peut être avantageuse en termes de revenu imposable et soumis à cotisations et contributions sociales dans le cas où vos charges de fonctionnement sont faibles.\n",
    "par défaut": "non"
  },
  "entreprise . imposition . IR . micro-fiscal . revenu abattu": {
    "remplace": "résultat fiscal",
    "résoudre la référence circulaire": "oui",
    "titre": "abattement forfaitaire micro-fiscal",
    "description": "Le micro-entrepreneur est dispensé d'établir une déclaration professionnelle de bénéfices au titre des BNC ou BIC.\n\nIl lui suffit de porter dans la déclaration complémentaire de revenu (n°2042-C Pro) le montant annuel du chiffre d'affaires brut (BIC) ou des recettes (BNC).\n",
    "somme": [
      "entreprise . chiffre d'affaires . vente restauration hébergement",
      "entreprise . chiffre d'affaires . service BIC",
      "entreprise . chiffre d'affaires . service BNC"
    ],
    "abattement": {
      "produit": {
        "composantes": [
          {
            "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
            "taux": "71%"
          },
          {
            "assiette": "entreprise . chiffre d'affaires . service BIC",
            "taux": "50%"
          },
          {
            "assiette": "entreprise . chiffre d'affaires . service BNC",
            "taux": "34%"
          }
        ]
      },
      "plancher": {
        "variations": [
          {
            "si": "entreprise . activité . mixte",
            "alors": "610 €/an"
          },
          {
            "sinon": "305 €/an"
          }
        ]
      }
    }
  },
  "entreprise . imposition . IR . micro-fiscal . alerte seuil dépassés": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "chiffre d'affaires . seuil micro dépassé",
    "description": "Le seuil annuel de chiffre d'affaires pour le régime micro-fiscal est dépassé. [En savoir plus](/documentation/entreprise/chiffre-d'affaires/seuil-micro-dépassé)"
  },
  "entreprise . chiffre d'affaires . seuil micro dépassé": {
    "applicable si": "imposition . IR",
    "description": "Le statut de micro-entreprise s'applique tant que le chiffre d'affaires annuel (effectivement encaissé au cours de l'année civile) ne dépasse pas les seuils du régime fiscal de la micro-entreprise.\n\nEn cas de dépassement **sur deux années consécutives**, l'entreprise bascule automatiquement dans le régime de [l'entreprise individuelle](/simulateurs/indépendant).\n\nÀ la fin de la première année d'activité, le CA est proratisé par rapport à la durée d'activité.\n\nExemple :\n> Un contribuable crée une entreprise le 1er août et encaisse des recettes HT de `50 000 €` au cours des cinq mois d'activité de sa première année civile d'exploitation.\n> Les recettes de cette première année civile sont ajustées *prorata temporis* pour les comparer au plafond :\n>\n> `50 000€ x (365/153) = 119 280 €`\n\n\nLes charges ne sont pas déductibles pour le calcul du plafond (comme pour le calcul des cotisations)\n\n\n### Multi-activité\n\nLorsqu'un entrepreneur exerce 2 activités au sein de sa micro-entreprise, le\nseuil de chiffre d’affaires à respecter n’est pas pour autant doublé. En\neffet l'exercice de plusieurs activités avec la même micro-entreprise\nn’augmente pas les seuils.\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32353",
      "Article 50-0 du Code général des impôts": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000006199553&cidTexte=LEGITEXT000006069577",
      "Bofip (dépassement micro-bnc)": "https://bofip.impots.gouv.fr/bofip/4807-PGP.html",
      "Bofip (dépassement micro-bic)": "https://bofip.impots.gouv.fr/bofip/1802-PGP.html",
      "autoentrepreneur.urssaf.fr": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/questions-frequentes.html"
    },
    "unité": "€/an",
    "une de ces conditions": [
      "entreprise . chiffre d'affaires > 176200 €/an",
      "entreprise . chiffre d'affaires . service > 72600 €/an"
    ]
  },
  "entreprise . imposition . IR . information sur le report de déficit": {
    "non applicable si": "micro-fiscal",
    "type": "notification",
    "formule": "résultat fiscal < 0 €/an",
    "description": "Lorsque votre résultat fiscal est négatif, ce dernier vient réduire le revenu imposables du foyer fiscal.\nUn déficit peut être imputé jusqu'à 6 ans après sa réalisation.\n\n[Voir les règles fiscales détaillées](https://bofip.impots.gouv.fr/bofip/2003-PGP.html/identifiant%3DBOI-BIC-DEF-20-10-20170301)\n",
    "références": {
      "bofip": "https://bofip.impots.gouv.fr/bofip/2003-PGP.html/identifiant%3DBOI-BIC-DEF-20-10-20170301"
    }
  },
  "entreprise . exercice": "oui",
  "entreprise . exercice . début": {
    "type": "date",
    "par défaut": "01/01/2021"
  },
  "entreprise . exercice . fin": {
    "type": "date",
    "par défaut": "31/12/2021"
  },
  "entreprise . exercice . durée": {
    "titre": "durée de l'exercice",
    "formule": {
      "durée": {
        "depuis": "début",
        "jusqu'à": "fin"
      }
    }
  },
  "entreprise . exercice . date trop ancienne": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "début < 01/01/2018",
    "description": "La date saisie est trop ancienne. Le simulateur n'intègre pas les barèmes avant 2018."
  },
  "entreprise . exercice . date trop éloignée": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "fin > 31/12/2022",
    "description": "La date saisie est trop éloignée. Le simulateur n'intègre pas les barèmes au delà de 2022."
  },
  "entreprise . exercice . début après la fin": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "début >= fin",
    "description": "La fin de l'exercice doit être postérieure à son début."
  },
  "entreprise . exercice . durée maximale": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "durée >= 24 mois",
    "description": "La durée maximale d'un exercice comptable est de 24 mois."
  },
  "entreprise . imposition . IS": {
    "valeur": "imposition = 'IS'",
    "titre": "Impôt sur les sociétés"
  },
  "entreprise . imposition . IS . résultat imposable": {
    "titre": "Résultat de l'exercice",
    "résumé": "Imposable à l'impôt sur les sociétés",
    "valeur": "résultat fiscal"
  },
  "entreprise . imposition . IS . information sur le report de déficit": {
    "type": "notification",
    "formule": "résultat imposable < 0 €/an",
    "description": "Les déficits subits au cours d'un exercice peuvent être reportés sur les exercices suivants (report en avant), ou sur le seul exercice précédent (report en arrière).\n"
  },
  "entreprise . imposition . IS . résultat net": {
    "résumé": "Après déduction des charges et de l'impôt sur les société",
    "somme": [
      "chiffre d'affaires",
      "(- charges)",
      "(- dirigeant . rémunération . totale)",
      "(- impôt sur les sociétés)"
    ],
    "par défaut": "0€"
  },
  "entreprise . imposition . IS . impôt sur les sociétés": {
    "unité": "€/an",
    "formule": {
      "barème": {
        "assiette": "résultat imposable",
        "multiplicateur": "prorata temporis",
        "variations": [
          {
            "si": "exercice . début >= 01/01/2022",
            "alors": {
              "tranches": [
                {
                  "taux": "15%",
                  "plafond": "plafond taux réduit 1"
                },
                {
                  "taux": "25%"
                }
              ]
            }
          },
          {
            "si": "exercice . début >= 01/01/2021",
            "alors": {
              "tranches": [
                {
                  "taux": "15%",
                  "plafond": "plafond taux réduit 1"
                },
                {
                  "taux": "26.5%"
                }
              ]
            }
          },
          {
            "si": "exercice . début >= 01/01/2020",
            "alors": {
              "tranches": [
                {
                  "taux": "15%",
                  "plafond": "plafond taux réduit 1"
                },
                {
                  "taux": "28%"
                }
              ]
            }
          },
          {
            "si": "exercice . début >= 01/01/2019",
            "alors": {
              "tranches": [
                {
                  "taux": "15%",
                  "plafond": "plafond taux réduit 1"
                },
                {
                  "taux": "28%",
                  "plafond": "plafond taux réduit 2"
                },
                {
                  "taux": "31%"
                }
              ]
            }
          },
          {
            "si": "exercice . début >= 01/01/2018",
            "alors": {
              "tranches": [
                {
                  "taux": "15%",
                  "plafond": "plafond taux réduit 1"
                },
                {
                  "taux": "28%",
                  "plafond": "plafond taux réduit 2"
                },
                {
                  "taux": "33.3333%"
                }
              ]
            }
          }
        ]
      },
      "arrondi": "oui"
    },
    "références": {
      "Fiche impots.gouv.fr": "https://www.impots.gouv.fr/portail/international-professionnel/impot-sur-les-societes",
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23575"
    }
  },
  "entreprise . imposition . IS . impôt sur les sociétés . plafond taux réduit 1": {
    "applicable si": "éligible taux réduit",
    "valeur": "38120 €/an"
  },
  "entreprise . imposition . IS . impôt sur les sociétés . plafond taux réduit 2": {
    "applicable si": "éligible taux réduit",
    "valeur": "500000 €/an"
  },
  "entreprise . imposition . IS . impôt sur les sociétés . éligible taux réduit": {
    "formule": {
      "toutes ces conditions": [
        "chiffre d'affaires <= 7630 k€/an * prorata temporis",
        {
          "nom": "capital détenu au moins à 75 pourcents par des personnes physiques",
          "valeur": "oui"
        }
      ]
    }
  },
  "entreprise . imposition . IS . impôt sur les sociétés . prorata temporis": {
    "description": "Lorsque la durée de l’exercice n'est pas égale à un an, on pro-ratise les\nplafonds utilisés dans le barème de l'impôt sur les sociétés.\n",
    "unité": "%",
    "formule": "exercice . durée / 1 an",
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/2065-PGP.html/identifiant%3DBOI-IS-LIQ-20-20-20180801"
    }
  },
  "entreprise . imposition . IS . impôt sur les sociétés . contribution sociale": {
    "description": "La contribution sociale sur les bénéfices est un impôt distinct de l’impôt sur les sociétés. Son montant n’est pas déductible des résultats.\n\nL’assiette bénéficie d’un abattement important, et seules les entreprises réalisant plus de 2,3 millions d’euros de bénéfices sont concernées par cette contribution.\n",
    "formule": {
      "produit": {
        "taux": "3.3%",
        "assiette": {
          "valeur": "impôt sur les sociétés",
          "abattement": "763000 €/an * prorata temporis"
        }
      }
    },
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/3492-PGP.html/identifiant%3DBOI-IS-AUT-10-20-20130318"
    }
  },
  "entreprise . charges": {
    "synonymes": [
      "charges d'exploitation",
      "charges de fonctionnement"
    ],
    "titre": "charges (hors rémunération dirigeant)",
    "identifiant court": "charges",
    "résumé": "Toutes les dépenses nécessaires à l'entreprise",
    "question": "Quelles sont les charges de l'entreprise ?",
    "description": "\nCe sont les dépenses de l'entreprise engagées dans l'intérêt de celle-ci, hors rémunération du dirigeant. Pour les sociétés et entreprises hors auto-entrepreneur, ces charges sont dites déductibles du résultat : l'entreprise ne paiera pas de cotisations ou impôt dessus. Pour l'auto-entrepreneur, elles ne sont pas déductibles du chiffre d'affaires encaissé.\n\nNous ne traitons pas encore la TVA : les charges sont à renseigner hors taxe (excepté pour les auto-entrepreneurs en franchise de TVA)\n\nPar exemple, les charges peuvent être :\n\n- achat de matières premières pour une activité de production\n- achat de produits en vue de leur revente, pour une activité commerciale\n- frais de repas : le supplément par rapport au coût d'un repas à domicile\n\nAttention : l'achat d'un ordinateur à 1000€ n'est pas une charge, mais une immobilisation : c'est un bien qui va profiter à l'entreprise pendant plusieurs années. Chaque année, une partie de cette immobilisation est amortie, et cet amortissement déductible peut être intégré dans ce calcul, par exemple 200€ par an pendant 5 ans.\n\nA l'inverse, un téléphone portable à moins de 500€ peut être assimilé à une charge sans immobilisation.\n",
    "références": {
      "Charges déductibles ou non du résultat fiscal d'une entreprise": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31973"
    },
    "par défaut": "0 €/an"
  },
  "entreprise . charges . dirigeant": {
    "titre": "Charges déductibles dirigeant",
    "description": "Les montants liés à la rémunération du dirigeant qui sont déductibles d'impôt.",
    "variations": [
      {
        "si": "imposition . IS",
        "alors": "dirigeant . rémunération . totale"
      },
      {
        "sinon": {
          "valeur": "dirigeant . indépendant . cotisations et contributions",
          "abattement": "dirigeant . indépendant . cotisations et contributions . non déductibles"
        }
      }
    ]
  },
  "entreprise . dividendes": "bénéficiaire . dividendes . bruts",
  "entreprise . capital social": {
    "description": "Cette valeur doit inclure la valeur des primes d'émission.\n",
    "titre": "Capital social",
    "question": "Quele est le capital social de la société ?",
    "unité": "€"
  },
  "entreprise . ACRE": {
    "description": "L'aide à la création ou à la reprise d'une entreprise (Acre) consiste en une exonération partielle de charges sociales, dite exonération de début d'activité pendant 12 mois.\n\nElle est **automatique** pour les **sociétés et les entreprises individuelles** (sous certaines conditions, comme par exemple ne pas en avoir bénéficié les trois dernières années).\n\nPour les **auto-entrepreneurs** en revanche, elle doit être demandée et est réservée aux bénéficiaires suivants:\n- Les demandeurs d'emplois (indemnisés ou non indemnisés mais ayant au moins 6 mois d’inscription à Pôle Emploi au cours des 18 derniers mois).\n- Les bénéficiaires d'aides sociales (RSA, ASS, ATA)\n- Les jeunes entre 18 et 25 ans (jusqu'à 29 ans pour les personnes reconnues en situation de handicap)\n- Les personnes créant une micro-entreprise dans un quartier prioritaire de la ville (QPPV)\n\n> *Historique*:\n- Pour les auto-entreprise créées à partir du 1er janvier 2020, l'exonération est de nouveau soumise à condition.\n- Pour les entreprises créées entre le 1er janvier 2019 et le 31 décembre 2019, la réduction est généralisée à tous les créateurs, sauf si vous avez déjà obtenu l'ACCRE dans les trois années précédentes\n- Pour les entreprises créées avant le 1er janvier 2019, la l'exonération de cotisation s'appelait ACCRE était soumise à conditions et n'était pas automatique : il fallait en faire la demande.",
    "question": "Votre entreprise bénéficie-t-elle de l'ACRE ?",
    "applicable si": {
      "une de ces conditions": [
        {
          "toutes ces conditions": [
            "dirigeant . auto-entrepreneur",
            "entreprise . durée d'activité < 3 ans",
            "entreprise . date de création < 04/2020"
          ]
        },
        "entreprise . durée d'activité . en début d'année < 1 an"
      ]
    },
    "par défaut": "ACRE par défaut",
    "note": "Les auto-entreprises crées entre le 1er janvier et le 31 décembre 2019 bénéficient d'un dispositif plus favorable, actif pendant 3 années."
  },
  "entreprise . ACRE par défaut": {
    "formule": {
      "variations": [
        {
          "si": {
            "toutes ces conditions": [
              "dirigeant . auto-entrepreneur",
              {
                "une de ces conditions": [
                  "entreprise . date de création < 01/01/2019",
                  "entreprise . date de création > 31/12/2019"
                ]
              }
            ]
          },
          "alors": "non"
        },
        {
          "sinon": "oui"
        }
      ]
    }
  },
  "entreprise . effectif": {
    "unité": "employé",
    "formule": {
      "variations": [
        {
          "si": "entreprise . effectif . seuil = 'moins de 5'",
          "alors": "4 employés"
        },
        {
          "si": "entreprise . effectif . seuil = 'moins de 11'",
          "alors": "10 employés"
        },
        {
          "si": "entreprise . effectif . seuil = 'moins de 20'",
          "alors": "19 employés"
        },
        {
          "si": "entreprise . effectif . seuil = 'moins de 50'",
          "alors": "49 employés"
        },
        {
          "si": "entreprise . effectif . seuil = 'moins de 150'",
          "alors": "149 employés"
        },
        {
          "si": "entreprise . effectif . seuil = 'moins de 250'",
          "alors": "250 employés"
        },
        {
          "si": "entreprise . effectif . seuil = 'plus de 250'",
          "alors": "251 employés"
        }
      ]
    }
  },
  "entreprise . effectif . seuil": {
    "titre": "seuil d'effectif",
    "question": "Quel est l'effectif de l'entreprise ?",
    "description": "De nombreuses cotisations patronales varient selon l'effectif de l'entreprise.\nLe franchissement d'un seuil à la hausse n'est pris en compte que s'il est atteint ou dépassé pendant 5 années civiles consécutives.\n",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "moins de 5",
          "moins de 11",
          "moins de 20",
          "moins de 50",
          "moins de 150",
          "moins de 250",
          "plus de 250"
        ]
      }
    },
    "par défaut": "'moins de 5'"
  },
  "entreprise . effectif . seuil . moins de 5": null,
  "entreprise . effectif . seuil . moins de 11": {
    "titre": "entre 5 et 10"
  },
  "entreprise . effectif . seuil . moins de 20": {
    "titre": "entre 11 et 19"
  },
  "entreprise . effectif . seuil . moins de 50": {
    "titre": "entre 20 et 49"
  },
  "entreprise . effectif . seuil . moins de 150": {
    "titre": "entre 50 et 149"
  },
  "entreprise . effectif . seuil . moins de 250": {
    "titre": "entre 150 et 250"
  },
  "entreprise . effectif . seuil . plus de 250": {
    "titre": "251 et plus"
  },
  "entreprise . ratio alternants": {
    "question": "Quelle est la fraction de contrats d'alternance dans l'effectif moyen de l'entreprise ?",
    "titre": "Fraction d'alternants",
    "description": "Cette fraction détermine la contribution supplémentaire pour l'apprentissage pour les entreprises concernées.\n",
    "suggestions": {
      "1%": "1%",
      "5%": "5%"
    },
    "par défaut": "0%"
  },
  "entreprise . association non lucrative": {
    "description": "L'entreprise est une association non lucrative",
    "question": "S'agit-il d'une association à but non lucratif ?",
    "par défaut": "non",
    "rend non applicable": [
      "contrat salarié . taxe d'apprentissage"
    ]
  },
  "entreprise . exonérée de TVA": {
    "question": "L'entreprise est-elle exonérée de TVA (hors franchise de base) ?",
    "par défaut": "non",
    "description": "Certains types d'entreprises ne sont pas assujetties à la TVA.\nCes dernières payent la taxe sur les salaires en contrepartie.\n\nC'est le cas par exemple des établissements bancaires, financiers ou d'assurance.\n",
    "references": {
      "Fiche economie.gouv.fr": "https://www.economie.gouv.fr/entreprises/taxe-salaires"
    }
  },
  "entreprise . taxe sur les salaires . montant avant décote": {
    "formule": {
      "valeur": "contrat salarié . taxe sur les salaires . barème / 1 employé * effectif",
      "abattement": "abattement associations"
    }
  },
  "entreprise . taxe sur les salaires . abattement associations": {
    "applicable si": "entreprise . association non lucrative",
    "formule": "21044 €/an"
  },
  "entreprise . taxe sur les salaires": {
    "applicable si": {
      "une de ces conditions": [
        "association non lucrative",
        "entreprise . exonérée de TVA"
      ]
    },
    "description": "Lorsque le montant de la taxe sur les salaires est inférieur à 1200 €/an, il n'y a pas besoin de faire de déclaration et la taxe n'est pas recouvré. Entre 1200 €/an et 2400 €/an une décote s'applique.",
    "formule": {
      "variations": [
        {
          "si": "montant avant décote <= 1200 €/an",
          "alors": "0 €/an"
        },
        {
          "si": "montant avant décote <= 2400 €/an",
          "alors": "montant avant décote - (2400 €/an - montant avant décote * 75%)"
        },
        {
          "sinon": "montant avant décote"
        }
      ]
    },
    "références": {
      "Fiche service-public": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22576"
    }
  },
  "entreprise . activité": {
    "titre": "nature de l'activité",
    "question": "Quelle est la nature de votre activité principale ?",
    "description": "Votre type d'activité va déterminer une grande partie des calculs de cotisations, contributions et impôt.",
    "par défaut": "'commerciale'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "artisanale",
          "commerciale",
          "libérale"
        ]
      }
    },
    "références": {
      "Vérifier la nature de son activité": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/verifier-nature-son-activite",
      "Comment déterminer la nature de l'activité d'une entreprise ?": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32887",
      "Spécifiquement pour les auto-entrepreneurs": "https://www.shine.fr/blog/categorie-activite-auto-entrepreneur"
    }
  },
  "entreprise . activité . libérale": {
    "description": "Ce sont les professions \"intellectuelles\" : médecins, sage-femme, kiné, avocat, mais aussi consultant, développeur, designer...\n\nSelon la loi, ce sont des personnes exerçant à titre habituel, de manière indépendante et sous leur responsabilité, une activité :\n  - de nature généralement civile,\n  - ayant pour objet d'assurer des prestations principalement intellectuelles, techniques ou de soins, mises en œuvre au moyen de qualifications professionnelles appropriées et dans le respect de principes éthiques ou d'une déontologie professionnelle.\n",
    "références": {
      "fiche Wikipedia": "https://fr.m.wikipedia.org/wiki/Profession_libérale",
      "liste des professions libérales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/liste-professions-liberales"
    }
  },
  "entreprise . activité . commerciale": {
    "description": "### Activité commerciale\n- Achats de biens pour leur revente en l'état (commerce en gros ou de détail)\n- Vente de prestations de service commerciales (location de matériel, transport, agence immobilière, hôtellerie-restauration, entreprise de spectacles, activité de sécurité privée, location, etc.)\n\n### Activité industrielle\n\nActivité de production ou de transformation grâce à l'utilisation d'outils industriels, extraction, industries minières, manutention, magasinage et stockage\n"
  },
  "entreprise . activité . artisanale": {
    "description": "C'est une activité de service, de production, de transformation, ou de réparation exercée par un professionnel qualifié, et qui nécessite des compétences et un savoir-faire spécifiques.\n\n>  Par exemple : les travaux, les activités liées au bâtiment, la réparation de produits fournis par le client, les coiffeurs...\n\n- L'entreprise ne doit pas employer plus de 10 salariés (l'activité devient commerciale au-delà)\n- Les activités artisanales sont répertoriées par un décret\n",
    "références": {
      "liste des activités artisanales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/activites-artisanales-0"
    }
  },
  "entreprise . activité . service ou vente": {
    "non applicable si": "mixte",
    "applicable si": {
      "une de ces conditions": [
        "activité = 'artisanale'",
        "activité = 'commerciale'"
      ]
    },
    "question": "Quelle est le type d'activité de l'entreprise ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "vente",
          "service"
        ]
      }
    },
    "par défaut": "'vente'"
  },
  "entreprise . activité . service ou vente . vente": {
    "titre": "vente de biens, restauration ou hébergement",
    "description": "Il s’agit de toute opération comportant transfert de propriété d'un bien\ncorporel (c'est-à-dire un bien ayant une existence matérielle), ainsi que\ntoutes les activités de restauration et d'hébergement.\n",
    "références": {
      "page impots.gouv.fr": "https://www.impots.gouv.fr/portail/professionnel/achatvente-de-biens"
    }
  },
  "entreprise . activité . service ou vente . service": {
    "titre": "prestation de service",
    "description": "Il s’agit de toute opération ne comportant pas de transfert de propriété de\nbiens corporels (c'est-à-dire ayant une existence matérielle).\n",
    "références": {
      "page impots.gouv.fr": "https://www.impots.gouv.fr/portail/professionnel/prestations-entre-assujettis"
    }
  },
  "entreprise . activité . mixte": {
    "titre": "Activités mixtes",
    "applicable si": "entreprise . imposition . IR . micro-fiscal",
    "question": "Votre entreprise a-t-elle plusieurs types d'activités ?",
    "par défaut": "non",
    "description": "Il est possible d'avoir plusieurs activités avec des types de revenus\ndifférents pour une même entreprise.\n\nPar exemple, une entreprise de plomberie qui facture l'achat et la pose d'un\nrobinet a une partie de son chiffre d'affaires en vente de materiel (le robinet)\net une partie en prestation de service (la pose).\n\nIl existe trois catégories avec des taux d’abattement forfaitaire pour frais différents :\n\n- [Ventes de biens, restauration et hébergement (BIC)](/documentation/entreprise/chiffre-d'affaires/vente-restauration-hébergement) (abattement de 71%)\n- [Prestation de service commerciale ou artisanale (BIC)](/documentation/entreprise/chiffre-d'affaires/service-BIC) (abattement de 50%)\n- [Autres prestation de service et activité libérale (BNC)](/documentation/entreprise/chiffre-d'affaires/service-BNC) (abattement de 34%)\n\nSi votre entreprise a des activités correspondants à plusieurs catégories de\nrevenus, répondez oui à cette question.\n"
  },
  "entreprise . activité . mixte . proportions": {
    "description": "Part des différentes activités dans le chiffre d'affaires",
    "titre": "proportion activité",
    "unité": "%",
    "somme": [
      {
        "nom": "service BIC",
        "variations": [
          {
            "si": "activité = 'libérale'",
            "alors": "0%"
          },
          {
            "sinon": "50%"
          }
        ]
      },
      {
        "nom": "service BNC",
        "variations": [
          {
            "si": "activité = 'libérale'",
            "alors": "2 / 3"
          },
          {
            "sinon": "0%"
          }
        ]
      },
      {
        "nom": "vente restauration hébergement",
        "variations": [
          {
            "si": "activité = 'libérale'",
            "alors": "1 / 3"
          },
          {
            "sinon": "50%"
          }
        ]
      }
    ],
    "note": "Il appartient à l'utilisateur de bien vérifier que la somme des trois pourcentages renseignés vaut 100%."
  },
  "entreprise . activité . libérale réglementée": {
    "question": "Est-ce une activité libérale réglementée ?",
    "par défaut": "non",
    "applicable si": "activité = 'libérale'",
    "description": "Certaines professions libérales ont été classées dans le domaine libéral par la loi et leur titre est protégé. Leurs membres doivent respecter des règles déontologiques strictes et sont soumis au contrôle de leurs instances professionnelles (ordre, chambre, ou syndicat).\n\n> Exemples de professions règlementées : architecte, avocat, infirmier, médecin...\n\nIl s'agit des autres personnes qui pratiquent, une science ou un art et dont l'activité intellectuelle joue le principal rôle. Leurs recettes doivent représenter la rémunération d'un travail personnel, sans lien de subordination, tout en engageant leur responsabilité technique et morale.\n\n> Exemples de professions non-règlementées : développeur, historien, urbaniste...\n",
    "références": {
      "Liste des activités libérales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/liste-professions-liberales"
    }
  },
  "entreprise . activité . débit de tabac": {
    "applicable si": "activité = 'commerciale'",
    "question": "Exercez-vous une activité de vente de tabac ?",
    "par défaut": "non"
  },
  "établissement": {
    "formule": "oui",
    "description": "Le salarié travaille dans un établissement de l'entreprise, identifié par un code SIRET.\n"
  },
  "établissement . localisation": {
    "icônes": "🌍",
    "description": "Lorsqu'une entreprise dispose de plusieurs établissements, certaines cotisations sont\ncalculées à l'échelle de l'établissement et sont fonction de règlementations locales.\n",
    "question": "Dans quelle commune l'établissement est-il implanté ?",
    "API": "commune",
    "par défaut": {
      "objet": {
        "code": 29019,
        "nom": "Non renseignée",
        "departement": {
          "nom": "Non renseigné"
        },
        "taux du versement transport": 1.8
      }
    }
  },
  "établissement . localisation . code commune": {
    "formule": {
      "synchronisation": {
        "data": "localisation",
        "chemin": "code"
      }
    }
  },
  "établissement . localisation . commune": {
    "description": "Lorsqu'une entreprise dispose de plusieurs établissements, certaines cotisations sont\ncalculées à l'échelle de l'établissement et sont fonction de règlementations locales.\n",
    "formule": {
      "synchronisation": {
        "data": "localisation",
        "chemin": "nom"
      }
    }
  },
  "établissement . taux du versement transport": {
    "unité": "%",
    "formule": {
      "synchronisation": {
        "data": "localisation",
        "chemin": "taux du versement transport"
      }
    }
  },
  "établissement . localisation . département": {
    "formule": {
      "synchronisation": {
        "data": "localisation",
        "chemin": "departement . nom"
      }
    }
  },
  "établissement . localisation . outre-mer": {
    "applicable si": {
      "une de ces conditions": [
        "département = 'Guadeloupe'",
        "département = 'Martinique'",
        "département = 'Guyane'",
        "département = 'La Réunion'",
        "département = 'Mayotte'"
      ]
    }
  },
  "établissement . localisation . outre-mer . Guadeloupe Réunion Martinique": {
    "formule": {
      "une de ces conditions": [
        "département = 'Guadeloupe'",
        "département = 'Martinique'",
        "département = 'La Réunion'"
      ]
    }
  },
  "établissement . ZFU": {
    "applicable si": "entreprise . date de création < 01/2015",
    "question": "Votre établissement bénéficie-t-il du dispositif zone franche urbaine (ZFU) ?",
    "par défaut": "non"
  },
  "établissement . ZFU . durée d'implantation en fin d'année": {
    "formule": {
      "durée": {
        "depuis": "entreprise . date de création",
        "jusqu'à": "31/12/2019"
      }
    }
  },
  "impôt": {
    "valeur": "oui",
    "icônes": "🏛️",
    "description": "Cet ensemble de formules est un modèle simplifié de l'impôt sur le revenu.",
    "titre": "impôt sur le revenu"
  },
  "impôt . montant": {
    "somme": [
      {
        "produit": {
          "assiette": "revenu imposable",
          "taux": "taux d'imposition"
        }
      },
      "dirigeant . auto-entrepreneur . impôt . versement libératoire . montant",
      "impôt . dividendes . PFU"
    ],
    "arrondi": "oui",
    "unité": "€/an",
    "titre": "Impôt sur le revenu"
  },
  "impôt . taux d'imposition": {
    "formule": {
      "variations": [
        {
          "si": "méthode de calcul . taux neutre",
          "alors": "taux neutre d'impôt sur le revenu"
        },
        {
          "si": "méthode de calcul . taux personnalisé",
          "alors": "taux personnalisé"
        },
        {
          "si": "méthode de calcul . barème standard",
          "alors": "foyer fiscal . taux effectif"
        }
      ]
    }
  },
  "impôt . méthode de calcul": {
    "description": "Nous avons implémenté trois façon de calculer l'impôt sur le revenu :\n- *Le taux personnalisé* : indiqué sur votre avis d'imposition\n- *Le taux neutre* : pour un célibataire sans enfants\n- *Le barème standard * : la formule \"officielle\" utilisée par l'administration fiscale pour obtenir le taux d'imposition\n\nEn remplissant votre taux personnalisé, vous serez au plus proche de votre situation réelle. Le taux neutre peut être intéressant dans le cas où vous n'avez pas transmis votre taux personnalisé à l'employeur et que vous souhaitez comparer les résultats du simulateur à votre fiche de paie. Le barème standard vous donne un résultat plus précis que le taux neutre pour un célibataire sans enfant.\n",
    "question": "Comment souhaitez-vous calculer l'impôt sur le revenu ?",
    "non applicable si": "dirigeant . auto-entrepreneur . impôt . versement libératoire",
    "par défaut": {
      "nom": "par défaut",
      "valeur": "'barème standard'"
    },
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "taux neutre",
          "taux personnalisé",
          "barème standard"
        ]
      }
    },
    "références": {
      "différence taux neutre / personnalisé": "https://www.impots.gouv.fr/portail/particulier/questions/quelles-sont-les-differences-entre-les-taux-de-prelevement-la-source-proposes",
      "calcul du taux d'imposition": "https://www.economie.gouv.fr/files/files/ESPACE-EVENEMENTIEL/PAS/Fiche_de_calcul_taux_simplifiee.pdf"
    }
  },
  "impôt . méthode de calcul . taux neutre": {
    "titre": "avec le taux neutre",
    "description": "Si vous ne connaissez pas votre taux personnalisé, ou si vous voulez connaître votre impôt à la source dans le cas où vous avez choisi de ne pas communiquer à votre taux à l'employeur, le calcul au taux neutre correspond à une imposition pour un célibataire sans enfants et sans autres revenus / charges.",
    "formule": "impôt . méthode de calcul = 'taux neutre'"
  },
  "impôt . méthode de calcul . taux personnalisé": {
    "titre": "avec un taux personnalisé",
    "description": "Vous pouvez utiliser directement le taux personnalisé communiqué par l'administration fiscale pour calculer votre impôt. Pour le connaître, vous pouvez-vous rendre sur votre [espace fiscal personnel](https://impots.gouv.fr).",
    "formule": "impôt . méthode de calcul = 'taux personnalisé'"
  },
  "impôt . méthode de calcul . barème standard": {
    "titre": "avec le barème standard",
    "description": "Le calcul \"officiel\" de l'impôt, celui sur lequel l'administration fiscale se base pour calculer votre taux d'imposition.",
    "formule": "impôt . méthode de calcul = 'barème standard'"
  },
  "impôt . méthode de calcul . PFU": {
    "titre": "avec prélèvement forfaitaire unique",
    "description": "Calcul de l'impôt des revenus de capitaux mobiliers avec le prélèvement forfaitaire unique (ou \"flat tax\")",
    "formule": "impôt . méthode de calcul = 'PFU'"
  },
  "impôt . méthode de calcul . prélèvement à la source": {
    "formule": {
      "une de ces conditions": [
        "taux neutre",
        "taux personnalisé"
      ]
    }
  },
  "impôt . revenu imposable": {
    "description": "C'est le revenu à prendre en compte pour calculer l'impôt avec un taux moyen d'imposition (neutre ou personnalisé).\n",
    "somme": [
      {
        "variations": [
          {
            "si": "dirigeant",
            "alors": "dirigeant . rémunération . imposable"
          },
          {
            "sinon": {
              "valeur": "contrat salarié . rémunération . net imposable",
              "abattement": "abattement contrat court"
            }
          }
        ]
      },
      "bénéficiaire . dividendes . imposables"
    ]
  },
  "impôt . revenu imposable . abattement contrat court": {
    "description": "Lorsque la durée d'un contrat de travail est inférieure à 2 mois, il est possible d'appliquer un abattement pour diminuer le montant du prélèvement à la source.",
    "applicable si": {
      "toutes ces conditions": [
        "méthode de calcul . taux neutre",
        "contrat salarié . CDD . durée contrat <= 2 mois"
      ]
    },
    "formule": {
      "valeur": "50% * SMIC temps plein . net imposable * 1 mois/an",
      "arrondi": "oui"
    },
    "note": "Cet abattement s'applique aussi pour les conventions de stage ou les contrats de mission (intérim) de moins de 2 mois.",
    "références": {
      "Bofip - dispositions spécifiques aux contrats courts": "https://bofip.impots.gouv.fr/bofip/11252-PGP.html?identifiant=BOI-IR-PAS-20-20-30-10-20180515"
    }
  },
  "impôt . taux neutre d'impôt sur le revenu . barème Guadeloupe Réunion Martinique": {
    "icônes": "🇬🇵🇷🇪 🇲🇶",
    "formule": {
      "grille": {
        "assiette": "revenu imposable",
        "tranches": [
          {
            "montant": "0%",
            "plafond": "1626 €/mois"
          },
          {
            "montant": "0.5%",
            "plafond": "1724 €/mois"
          },
          {
            "montant": "1.3%",
            "plafond": "1900 €/mois"
          },
          {
            "montant": "2.1%",
            "plafond": "2075 €/mois"
          },
          {
            "montant": "2.9%",
            "plafond": "2292 €/mois"
          },
          {
            "montant": "3.5%",
            "plafond": "2417 €/mois"
          },
          {
            "montant": "4.1%",
            "plafond": "2500 €/mois"
          },
          {
            "montant": "5.3%",
            "plafond": "2750 €/mois"
          },
          {
            "montant": "7.5%",
            "plafond": "3400 €/mois"
          },
          {
            "montant": "9.9%",
            "plafond": "4350 €/mois"
          },
          {
            "montant": "11.9%",
            "plafond": "4942 €/mois"
          },
          {
            "montant": "13.8%",
            "plafond": "5725 €/mois"
          },
          {
            "montant": "15.8%",
            "plafond": "6858 €/mois"
          },
          {
            "montant": "17.9%",
            "plafond": "7625 €/mois"
          },
          {
            "montant": "20%",
            "plafond": "8667 €/mois"
          },
          {
            "montant": "24%",
            "plafond": "11917 €/mois"
          },
          {
            "montant": "28%",
            "plafond": "15833 €/mois"
          },
          {
            "montant": "33%",
            "plafond": "24167 €/mois"
          },
          {
            "montant": "38%",
            "plafond": "52825 €/mois"
          },
          {
            "montant": "43%"
          }
        ]
      }
    },
    "note": "Ce barème n'a pas été revalorisé en 2021."
  },
  "impôt . taux neutre d'impôt sur le revenu . barème Guyane Mayotte": {
    "icônes": "🇬🇾 🇾🇹",
    "formule": {
      "grille": {
        "assiette": "revenu imposable",
        "tranches": [
          {
            "montant": "0%",
            "plafond": "1741 €/mois"
          },
          {
            "montant": "0.5%",
            "plafond": "1883 €/mois"
          },
          {
            "montant": "1.3%",
            "plafond": "2100 €/mois"
          },
          {
            "montant": "2.1%",
            "plafond": "2367 €/mois"
          },
          {
            "montant": "2.9%",
            "plafond": "2458 €/mois"
          },
          {
            "montant": "3.5%",
            "plafond": "2542 €/mois"
          },
          {
            "montant": "4.1%",
            "plafond": "2625 €/mois"
          },
          {
            "montant": "5.3%",
            "plafond": "2917 €/mois"
          },
          {
            "montant": "7.5%",
            "plafond": "4025 €/mois"
          },
          {
            "montant": "9.9%",
            "plafond": "5208 €/mois"
          },
          {
            "montant": "11.9%",
            "plafond": "5875 €/mois"
          },
          {
            "montant": "13.8%",
            "plafond": "6817 €/mois"
          },
          {
            "montant": "15.8%",
            "plafond": "7500 €/mois"
          },
          {
            "montant": "17.9%",
            "plafond": "8308 €/mois"
          },
          {
            "montant": "20%",
            "plafond": "9642 €/mois"
          },
          {
            "montant": "24%",
            "plafond": "12971 €/mois"
          },
          {
            "montant": "28%",
            "plafond": "16500 €/mois"
          },
          {
            "montant": "33%",
            "plafond": "26443 €/mois"
          },
          {
            "montant": "38%",
            "plafond": "55815 €/mois"
          },
          {
            "montant": "43%"
          }
        ]
      }
    },
    "note": "Ce barème n'a pas été revalorisé en 2021."
  },
  "impôt . taux neutre d'impôt sur le revenu": {
    "description": "C'est le barème à appliquer sur le salaire mensuel imposable pour obtenir l'impôt à payer mensuellement pour les salariés qui ne veulent pas révéler à leur entreprise leur taux d'imposition (ce taux peut révéler par exemple des revenus du patrimoine importants).\n",
    "note": "Attention, l'abattement de 10% est inclus implicitement dans ce barème. L'assiette est donc bien le salaire imposable, et non le salaire imposable abattu.",
    "formule": {
      "variations": [
        {
          "si": "établissement . localisation . outre-mer . Guadeloupe Réunion Martinique",
          "alors": "barème Guadeloupe Réunion Martinique"
        },
        {
          "si": {
            "une de ces conditions": [
              "établissement . localisation . département = 'Guyane'",
              "établissement . localisation . département = 'Mayotte'"
            ]
          },
          "alors": "barème Guyane Mayotte"
        },
        {
          "sinon": {
            "grille": {
              "assiette": "revenu imposable",
              "tranches": [
                {
                  "montant": "0%",
                  "plafond": "1420 €/mois"
                },
                {
                  "montant": "0.5%",
                  "plafond": "1475 €/mois"
                },
                {
                  "montant": "1.3%",
                  "plafond": "1570 €/mois"
                },
                {
                  "montant": "2.1%",
                  "plafond": "1676 €/mois"
                },
                {
                  "montant": "2.9%",
                  "plafond": "1791 €/mois"
                },
                {
                  "montant": "3.5%",
                  "plafond": "1887 €/mois"
                },
                {
                  "montant": "4.1%",
                  "plafond": "2012 €/mois"
                },
                {
                  "montant": "5.3%",
                  "plafond": "2381 €/mois"
                },
                {
                  "montant": "7.5%",
                  "plafond": "2725 €/mois"
                },
                {
                  "montant": "9.9%",
                  "plafond": "3104 €/mois"
                },
                {
                  "montant": "11.9%",
                  "plafond": "3494 €/mois"
                },
                {
                  "montant": "13.8%",
                  "plafond": "4077 €/mois"
                },
                {
                  "montant": "15.8%",
                  "plafond": "4888 €/mois"
                },
                {
                  "montant": "17.9%",
                  "plafond": "6116 €/mois"
                },
                {
                  "montant": "20%",
                  "plafond": "7640 €/mois"
                },
                {
                  "montant": "24%",
                  "plafond": "10604 €/mois"
                },
                {
                  "montant": "28%",
                  "plafond": "14362 €/mois"
                },
                {
                  "montant": "33%",
                  "plafond": "22545 €/mois"
                },
                {
                  "montant": "38%",
                  "plafond": "48292 €/mois"
                },
                {
                  "montant": "43%"
                }
              ]
            }
          }
        }
      ]
    },
    "références": {
      "Explication de l'impôt neutre": "https://www.economie.gouv.fr/prelevement-a-la-source/taux-prelevement#taux-non-personnalise",
      "BOFIP": "http://bofip.impots.gouv.fr/bofip/11255-PGP.html"
    }
  },
  "impôt . taux personnalisé": {
    "question": "Quel est votre taux de prélèvement à la source ?",
    "description": "Votre taux moyen d'imposition personnalisé, que vous pouvez retrouver sur :\n  - une fiche de paie\n  - un avis d'imposition\n  - votre espace personnel [impots.gouv.fr](https://impots.gouv.fr)\n",
    "unité": "%"
  },
  "impôt . foyer fiscal": {
    "icônes": "👨‍👩‍👧‍👦",
    "formule": "oui"
  },
  "impôt . foyer fiscal . situation de famille": {
    "question": "Quelle est votre situation familiale ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "célibataire",
          "couple",
          "veuf"
        ]
      }
    },
    "par défaut": "'célibataire'"
  },
  "impôt . foyer fiscal . situation de famille . célibataire": {
    "titre": "Célibataire / Divorcé(e) / Union libre"
  },
  "impôt . foyer fiscal . situation de famille . couple": {
    "titre": "Marié(e)s / Pacsé(e)s"
  },
  "impôt . foyer fiscal . situation de famille . veuf": {
    "titre": "Veuf(ve)"
  },
  "impôt . foyer fiscal . enfants à charge": {
    "question": "Combien d'enfants sont à charge du foyer fiscal ?",
    "par défaut": "0 enfants"
  },
  "impôt . foyer fiscal . nombre de parts": {
    "unité": "parts",
    "formule": {
      "somme": [
        "principales",
        "rattachées",
        "majoration personne seule avec enfant",
        "majoration personne veuve avec enfant"
      ]
    }
  },
  "impôt . foyer fiscal . nombre de parts . sans parts rattachées": "nombre de parts - nombre de parts . rattachées",
  "impôt . foyer fiscal . nombre de parts . principales": {
    "formule": {
      "variations": [
        {
          "si": "situation de famille = 'couple'",
          "alors": "2 parts"
        },
        {
          "sinon": "1 part"
        }
      ]
    }
  },
  "impôt . foyer fiscal . nombre de parts . rattachées": {
    "formule": {
      "variations": [
        {
          "si": "enfants à charge <= 2 enfants",
          "alors": "0.5 part/enfant * enfants à charge"
        },
        {
          "sinon": "(1 part/enfant * enfants à charge) - 1 part"
        }
      ]
    }
  },
  "impôt . foyer fiscal . nombre de parts . majoration personne seule avec enfant": {
    "description": "Les contribuables célibataires, divorcés ou séparés, qui vivent seuls et supportent effectivement la charge d’un ou plusieurs enfants bénéficient d’une demie-part supplémentaire de quotient familial.",
    "applicable si": {
      "toutes ces conditions": [
        "situation de famille = 'célibataire'",
        "enfants à charge > 0 enfants"
      ]
    },
    "formule": "0.5 part",
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/2028-PGP.html/identifiant=BOI-IR-LIQ-10-20-20-10-20140326#Majoration_pour_les_personn_22"
    }
  },
  "impôt . foyer fiscal . nombre de parts . majoration personne veuve avec enfant": {
    "description": "Une personne veuve avec des enfants à charge bénéficie d'une part supplémentaire pour le calcul du quotient familial, ce qui correspond au maintient de la part de la personne décédée.\nUne personne veuve sans enfant à charge ne bénéficie en revanche d'aucune majoration.",
    "applicable si": {
      "toutes ces conditions": [
        "situation de famille = 'veuf'",
        "enfants à charge > 0 enfants"
      ]
    },
    "formule": "1 part",
    "références": {
      "Quotient familial d'une personne veuve": "https://www.service-public.fr/particuliers/vosdroits/F35127"
    }
  },
  "impôt . foyer fiscal . taux effectif": {
    "unité": "%",
    "variations": [
      {
        "si": "impôt à payer = 0",
        "alors": "0%"
      },
      {
        "sinon": "impôt à payer / revenu imposable"
      }
    ]
  },
  "impôt . foyer fiscal . revenu imposable": {
    "formule": {
      "somme": [
        "revenu d'activité abattu",
        {
          "applicable si": {
            "toutes ces conditions": [
              "dirigeant . rémunération . imposable",
              "entreprise . imposition . IR"
            ]
          },
          "valeur": "dirigeant . rémunération . imposable"
        },
        "bénéficiaire . dividendes . imposables",
        "autres revenus imposables"
      ]
    }
  },
  "impôt . foyer fiscal . revenu imposable . revenu d'activité abattu": {
    "description": "Dans le cas général, l'impôt est calculé après l'application d'un abattement forfaitaire fixe. Chacun peut néanmoins opter pour la déclaration de ses *frais réels*, qui viendront remplacer ce forfait par défaut.\n",
    "valeur": {
      "nom": "assiette",
      "variations": [
        {
          "si": "dirigeant = non",
          "alors": "contrat salarié . rémunération . net imposable"
        },
        {
          "si": "entreprise . imposition = 'IS'",
          "alors": "dirigeant . rémunération . imposable"
        }
      ]
    },
    "abattement": {
      "valeur": "10% * assiette",
      "plafond": {
        "variations": [
          {
            "si": "année = 2022",
            "alors": "12829 €/an"
          },
          {
            "si": "année = 2021",
            "alors": "12652 €/an"
          },
          {
            "si": "année = 2020",
            "alors": "12627 €/an"
          }
        ]
      },
      "plancher": {
        "variations": [
          {
            "si": "année = 2022",
            "alors": "448 €/an"
          },
          {
            "si": "année = 2021",
            "alors": "442 €/an"
          },
          {
            "si": "année = 2020",
            "alors": "441 €/an"
          }
        ]
      }
    },
    "références": {
      "Frais professionnels - forfait ou frais réels": "https://www.service-public.fr/particuliers/vosdroits/F1989",
      "Code des impôts": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037985819/2022-01-04/"
    }
  },
  "impôt . foyer fiscal . revenu imposable . autres revenus imposables": {
    "titre": "Autres revenus imposables du foyer fiscal",
    "question": "Quel est le montant total des autres revenus imposables du foyer fiscal ?",
    "par défaut": "0 €/an"
  },
  "impôt . foyer fiscal . revenu fiscal de référence": {
    "description": "Le revenu fiscal de référence correspond au revenu abattu du foyer ajusté avec un mécanisme de quotient et majoré d'un certains nombre d'exonérations. Ces dernières sont réintégrées dans le calcul.",
    "formule": {
      "somme": [
        "revenu imposable",
        "contrat salarié . prime d'impatriation"
      ]
    },
    "références": {
      "Article 1417 du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000034596743&cidTexte=LEGITEXT000006069577&categorieLien=id&dateTexte=20170505"
    }
  },
  "impôt . foyer fiscal . impôt à payer": {
    "formule": {
      "somme": [
        "impôt sur le revenu",
        "CEHR"
      ]
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu": {
    "unité": "€/an",
    "formule": {
      "somme": [
        {
          "valeur": "impôt brut",
          "abattement": "décote"
        },
        "impôt . dividendes . PFU"
      ]
    },
    "exemples": [
      {
        "nom": "Salaire d'un cadre",
        "situation": {
          "contrat salarié . rémunération . net imposable": 4000
        },
        "valeur attendue": 6977
      }
    ],
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F34328"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . décote": {
    "description": "Une décote est appliquée après le barème de l'impôt sur le revenu, pour réduire l'impôt des bas revenus.",
    "variations": [
      {
        "si": "foyer fiscal . situation de famille = 'couple'",
        "alors": {
          "variations": [
            {
              "si": "année = 2022",
              "alors": "1307 €/an"
            },
            {
              "si": "année = 2021",
              "alors": "1289 €/an"
            },
            {
              "si": "année = 2020",
              "alors": "1286 €/an"
            }
          ]
        }
      },
      {
        "sinon": {
          "variations": [
            {
              "si": "année = 2022",
              "alors": "790 €/an"
            },
            {
              "si": "année = 2021",
              "alors": "779 €/an"
            },
            {
              "si": "année = 2020",
              "alors": "777 €/an"
            }
          ]
        }
      }
    ],
    "abattement": "45.25% * impôt brut",
    "références": {
      "Fiche economie.gouv.fr": "https://www.economie.gouv.fr/particuliers/decote-impot-revenu"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . quotient familial": {
    "unité": "€/part/an",
    "formule": "revenu imposable / nombre de parts"
  },
  "impôt . foyer fiscal . impôt sur le revenu . quotient familial . sans parts rattachées": {
    "unité": "€/part/an",
    "formule": "revenu imposable / nombre de parts . sans parts rattachées"
  },
  "impôt . foyer fiscal . impôt sur le revenu . quotient familial . plafond avantage": {
    "formule": {
      "somme": [
        {
          "produit": {
            "assiette": {
              "variations": [
                {
                  "si": "nombre de parts . majoration personne seule avec enfant",
                  "alors": "nombre de parts . rattachées - 0.5 part"
                },
                {
                  "sinon": "nombre de parts . rattachées"
                }
              ]
            },
            "facteur": "2 * 1570 €/part/an"
          }
        },
        {
          "variations": [
            {
              "si": "nombre de parts . majoration personne seule avec enfant",
              "alors": "3704 €/an"
            },
            {
              "sinon": "0 €/an"
            }
          ]
        }
      ]
    },
    "références": {
      "Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000041464047&cidTexte=LEGITEXT000006069577&categorieLien=id&dateTexte=20190608",
      "Bofip": "https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20200515#III._Niveau_du_plafonnement_12"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut . par part": {
    "description": "Voici le fameux barème de l'impôt sur le revenu. C'est un barème marginal à 5 tranches.\nUne contribution sur les hauts revenus ajoute deux tranches supplémentaires.\n\nAttention : pour un revenu de 100 000€ annuels, le contribuable ne paiera pas 41 000€ d'impôt (le taux de la 4ème tranche est 41%) ! Ces 41% sont appliqués uniquement à la part de ses revenus supérieure à 72 617€.\n",
    "barème": {
      "assiette": "quotient familial",
      "tranches": [
        {
          "taux": "0%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "10225 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "10084 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "11%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "26070 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "25710 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "30%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "74545 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "73516 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "41%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "160336 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "158122 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "45%"
        }
      ]
    },
    "exemples": [
      {
        "nom": "Haut salaire de ~ 10 000€ mensuels",
        "situation": {
          "contrat salarié . rémunération . net imposable": 10000
        },
        "valeur attendue": 30227
      }
    ],
    "références": {
      "Article 197 du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069577&idArticle=LEGIARTI000006308322",
      "Mise à jour 2022": "https://www.economie.gouv.fr/particuliers/changement-2022-particuliers?xtor=ES-39-%5BBI_249_20220104%5D-20220104-%5Bhttps://www.economie.gouv.fr/particuliers/changement-2022-particuliers%5D"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut . sans parts rattachées": {
    "barème": {
      "assiette": "quotient familial . sans parts rattachées",
      "tranches": [
        {
          "taux": "0%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "10225 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "10084 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "11%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "26070 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "25710 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "30%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "74545 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "73516 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "41%",
          "plafond": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "160336 €/part/an"
              },
              {
                "si": "année = 2021",
                "alors": "158122 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "45%"
        }
      ]
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut": {
    "formule": {
      "le maximum de": [
        "impôt brut . sans plafonnement",
        {
          "somme": [
            "impôt brut . sans plafonnement . sans parts rattachées",
            "(- quotient familial . plafond avantage)"
          ]
        }
      ]
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut . sans plafonnement": {
    "produit": {
      "assiette": "impôt brut . par part",
      "facteur": "nombre de parts"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut . sans plafonnement . sans parts rattachées": {
    "produit": {
      "assiette": "impôt brut . sans parts rattachées",
      "facteur": "nombre de parts . sans parts rattachées"
    }
  },
  "impôt . foyer fiscal . CEHR": {
    "unité": "€/an",
    "formule": {
      "variations": [
        {
          "si": "foyer fiscal . situation de famille = 'couple'",
          "alors": {
            "barème": {
              "assiette": "revenu imposable",
              "tranches": [
                {
                  "taux": "0%",
                  "plafond": "500000 €/an"
                },
                {
                  "taux": "3%",
                  "plafond": "1000000 €/an"
                },
                {
                  "taux": "4%"
                }
              ]
            }
          }
        },
        {
          "sinon": {
            "barème": {
              "assiette": "revenu imposable",
              "tranches": [
                {
                  "taux": "0%",
                  "plafond": "250000 €/an"
                },
                {
                  "taux": "3%",
                  "plafond": "500000 €/an"
                },
                {
                  "taux": "4%"
                }
              ]
            }
          }
        }
      ]
    },
    "références": {
      "contribution exceptionnelle sur les hauts revenus": "https://www.service-public.fr/particuliers/vosdroits/F31130",
      "Article 223 sexies du Code général des impôts": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000025049019&cidTexte=LEGITEXT000006069577",
      "Bofip.impots.gouv.fr": "http://bofip.impots.gouv.fr/bofip/7804-PGP"
    }
  },
  "impôt . domiciliation étranger non implémentée": {
    "formule": "situation personnelle . domiciliation fiscale à l'étranger",
    "type": "notification",
    "niveau": "avertissement",
    "description": "La retenue à la source pour les non-résident n'est pas encore implémentée. Pour en savoir plus, se référer à la [documentation fiscale](https://www.impots.gouv.fr/portail/international-particulier/je-suis-non-resident-dois-je-declarer-des-revenus-et-payer-des-impots-en)\n"
  },
  "impôt . dividendes": {
    "valeur": "oui",
    "applicable si": "bénéficiaire . dividendes . bruts > 0",
    "titre": "Imposition des dividendes"
  },
  "impôt . montant si autres revenus imposables uniquement": {
    "recalcul": {
      "règle": "impôt . foyer fiscal . impôt à payer",
      "avec": {
        "bénéficiaire . dividendes . bruts": "0 €/an",
        "impôt . foyer fiscal . revenu imposable": "foyer fiscal . revenu imposable . autres revenus imposables"
      }
    },
    "titre": "Montant de l'impôt dans le cas où aucun dividende ne serait touché"
  },
  "impôt . dividendes . montant en sus des autres revenus imposables": {
    "variations": [
      {
        "si": "méthode de calcul . PFU",
        "alors": "PFU"
      },
      {
        "sinon": "impôt . foyer fiscal . impôt à payer - montant si autres revenus imposables uniquement"
      }
    ],
    "titre": "Montant de l'impôt sur dividendes, en sus de l'impôt sur les autres revenus imposables"
  },
  "impôt . dividendes . PFU": {
    "applicable si": "impôt . méthode de calcul . PFU",
    "produit": {
      "assiette": "bénéficiaire . dividendes . bruts",
      "taux": "12.8%"
    },
    "titre": "Montant de l'impôt sur dividendes au titre du Prélèvement Forfaitaire Unique (ou \"flat tax\")",
    "description": "Ce montant est à verser sous forme d'acompte au moment du versement des\ndividendes.\n\nL'acompte n'est pas obligatoire au cas où le revenu fiscal n-2 est inférieur\nà\n\n  - 50 000 € pour une personne seule,\n  - 75 000 € pour un couple soumis à l'imposition commune (mariés ou\n    pacsés).\n\nDans ce cas, le bénéficiaire peut faire la demande de dispense au plus tard\nle 30 novembre de l'année précédant celle du paiement\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963",
      "Article 200 A du Code Général des Impôts": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006179579/",
      "Article 117 quater du Code Général des Impôts": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000036428175/#LEGIARTI000036428175"
    }
  },
  "dirigeant . indépendant . PL": {
    "titre": "Profession libérale",
    "applicable si": "entreprise . activité = 'libérale'",
    "rend non applicable": "entreprise . activité . mixte",
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . métier": {
    "applicable si": "entreprise . activité . libérale réglementée",
    "par défaut": "'rattaché CIPAV'",
    "question": "A quelle catégorie appartient votre profession ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "santé",
          "avocat",
          "expert-comptable",
          "rattaché CIPAV"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . métier . rattaché CIPAV": {
    "titre": "Autre métier rattaché à la CIPAV",
    "description": "Vous exercez un métier réglementé rattaché à la CIPAV. La liste de ces métiers est :\n\n- Architecte (architecte, architecte d’intérieur, économiste de la construction, maître d’œuvre, géomètre expert)\n- Guide-montagne (moniteur de ski, guide de haute montagne, accompagnateur de moyenne montagne)\n- Ostéopathe\n- Psychologue\n- Psychothérapeute\n- Psychomotriciens\n- Ergothérapeute\n- Diététicien\n- Chiropracteur\n- Ingénieur conseil\n- Guide-conférencier\n- Artistes autres que les artistes-auteurs\n- Experts devant les tribunaux\n- Experts automobiles\n- Mandataires judiciaires à la protection des majeurs\n"
  },
  "dirigeant . indépendant . PL . métier . santé": {
    "titre": "Praticien ou auxiliaire médical",
    "question": "Quel métier exercez-vous en tant que professionnel de santé ?",
    "description": "Si vous êtes praticien ou auxiliaire médical conventionné, vous relevez du\nrégime d'assurance maladie des praticiens et auxiliaires médicaux\nconventionnés (PAMC). Le point sur les conditions à remplir pour bénéficier\nde ce régime d'assurance maladie et sur les modalités de votre protection\nsociale.\n\n> *Exceptions* : Les ostéopathe, psychologue, psychothérapeute, ergothérapeute,\ndiététicien et chiropracteur ne dépendent pas du régime PAMC mais de la\nCIPAV pour leur retraite et invalidité.\n",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "médecin",
          "chirurgien-dentiste",
          "sage-femme",
          "auxiliaire médical",
          "pharmacien"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . métier . santé . auxiliaire médical": {
    "description": "Vous exercez un des métiers suivants : infirmier, masseur-kinésithérapeute, orthophoniste, orthoptiste ou pédicure-podologue.\n"
  },
  "dirigeant . indépendant . PL . métier . santé . pharmacien": null,
  "dirigeant . indépendant . PL . métier . santé . chirurgien-dentiste": null,
  "dirigeant . indépendant . PL . métier . santé . sage-femme": null,
  "dirigeant . indépendant . PL . métier . santé . médecin": null,
  "dirigeant . indépendant . PL . métier . secteur médecin": {
    "applicable si": "métier = 'santé . médecin'",
    "question": "Sur quel secteur êtes-vous conventionné ?",
    "description": "Les taux de cotisations et remboursement de la CPAM ne sont pas les même en\nfonction du régime de tarification choisie par le praticien.\n",
    "par défaut": "'S1'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "S1",
          "S2",
          "non conventionné"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . métier . secteur médecin . S1": {
    "titre": "Secteur 1"
  },
  "dirigeant . indépendant . PL . métier . secteur médecin . S2": {
    "titre": "Secteur 2"
  },
  "dirigeant . indépendant . PL . métier . secteur médecin . non conventionné": null,
  "dirigeant . indépendant . PL . métier . avocat": {
    "description": "Les avocats cotisent auprès d'un organisme autonome pour la retraite et la\nprévoyance.\n"
  },
  "dirigeant . indépendant . PL . métier . expert-comptable": {
    "description": "Les experts comptables et les commissaires aux comptes cotisent auprès d'un\norganisme autonome pour la retraite et la prévoyance.\n"
  },
  "dirigeant . indépendant . PL . option régime général": {
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . activité . libérale réglementée = non",
        "entreprise . date de création < 01/2019"
      ]
    },
    "question": "Avez-vous opté pour le rattachement au régime général des indépendants ?",
    "description": "Les personnes exerçant déjà une profession libérale non réglementée avant\n2019 peuvent opter entre 2019 et 2023 pour la Sécurité sociale pour les\nindépendants, à condition d’être à jour dans le paiement de toutes leurs\ncotisations à la CIPAV.\n\nCette option leur permettra de bénéficier des mêmes droits que les artisans\net commerçants (indemnités journalières, retraite, invalidité, etc.).\n\nIls auront nottament accès à des indemnités journalières en cas d'arrêt de\ntravail ou de maternité, ce qui n'est pas le cas à la CIPAV.\n\nLa demande est à effectuer auprès de la CIPAV. Elle prendra effet au 1er\njanvier de l’année suivante et sera définitive.\n",
    "références": {
      "fiche information droit d'option (PDF CIPAV)": "https://www.lacipav.fr/sites/default/files/2019-03/Fiche%20pratique%20droit%20d%27option.pdf",
      "bpi-france": "https://bpifrance-creation.fr/entrepreneur/actualites/nouvelle-liste-activites-liberales-non-reglementees-relevant-cipav",
      "sécu-indépendant.fr": "https://www.secu-independants.fr/creation-entreprise/professions-liberales/professions-de-sante/definir-son-concept/choisir-son-activite/"
    },
    "par défaut": "non"
  },
  "dirigeant . indépendant . PL . régime général": {
    "description": "Les professions libérales non règlementées affiliées au régime général\nbénéficient de la même protection sociale que les artisans et commerçants.\n\nC'est le cas des professions libérales non règlementées crées avant le\n01/2019, ou celles ayant exercé leur [droit\nd'option](/documentation/dirigeant/indépendant/PL/option-régime-général)\n",
    "formule": {
      "toutes ces conditions": [
        "CIPAV = non",
        "entreprise . activité . libérale réglementée = non"
      ]
    }
  },
  "dirigeant . indépendant . PL . régime général . taux spécifique retraite complémentaire": {
    "titre": "taux spécifique profession libérale non reglementée",
    "question": "Avez-vous opté pour des taux spécifiques de cotisation retraite complémentaire ?",
    "par défaut": "non",
    "description": "Les professions libérales non règlementées qui ont débuté leur activité à\ncompter du 1er janvier 2019 ou ceux qui ont débuté leur activité avant la\ndate du 1er janvier 2019  et ont opté pour le régime général des\ntravailleurs indépendants  ont la possibilité d’opter pour des taux\nspécifique de la cotisation retraite complémentaire.\n",
    "références": {
      "Guide PL urssaf": "https://www.urssaf.fr/portail/files/live/sites/urssaf/files/documents/Diaporama_TI_statuts_hors_AE.pdf"
    }
  },
  "dirigeant . indépendant . PL . régime général . taux spécifique retraite complémentaire . montant": {
    "titre": "retraite complémentaire (taux PLNR)",
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "barème": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale temps plein",
        "tranches": [
          {
            "taux": "0%",
            "plafond": 1
          },
          {
            "taux": "14%",
            "plafond": 4
          }
        ]
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . maladie": {
    "titre": "maladie (taux PLR)",
    "non applicable si": {
      "une de ces conditions": [
        "régime général",
        "PAMC"
      ]
    },
    "remplace": "cotisations et contributions . maladie",
    "produit": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . maladie"
      },
      "taux": {
        "taux progressif": {
          "assiette": "assiette des cotisations",
          "multiplicateur": "plafond sécurité sociale temps plein",
          "tranches": [
            {
              "plafond": "0%",
              "taux": "1.5%"
            },
            {
              "plafond": "110%",
              "taux": "6.5%"
            }
          ]
        }
      }
    },
    "arrondi": "oui",
    "références": {
      "secu-independants.fr": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/taux-de-cotisations",
      "guide urssaf (pdf)": "https://www.urssaf.fr/portail/files/live/sites/urssaf/files/documents/Diaporama_PL_statuts_hors_AE_et_PAM.pdf"
    },
    "note": "Les professions libérales réglementée ne cotisent pour la part correspondante aux\nindemnités journalières et n'ont donc pas le droit à ces indemnités en cas de\nmaladie.\n"
  },
  "dirigeant . indépendant . PL . cotisations Urssaf": {
    "description": "Les cotisations recouvrées par l'Urssaf, qui servent au financement\nde la sécurité sociale (assurance maladie, allocations familiales,\ndépendance).\n",
    "formule": {
      "somme": [
        "cotisations et contributions . CSG et CRDS",
        "cotisations et contributions . maladie",
        "cotisations et contributions . allocations familiales",
        "cotisations et contributions . formation professionnelle",
        "PAMC . CURPS"
      ],
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . cotisations caisse de retraite": {
    "description": "Les cotisations recouvrée par la caisse de retraite autonome spécifique à la profession libérale effectuée.\n",
    "formule": {
      "somme": [
        "cotisations et contributions . retraite de base",
        "cotisations et contributions . retraite complémentaire",
        "cotisations et contributions . invalidité et décès",
        "cotisations et contributions . indemnités journalières maladie",
        "cotisations et contributions . PCV"
      ],
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CIPAV": {
    "description": "La CIPAV est la caisse de retraite autonomes des professions libérales réglementées.\n",
    "rend non applicable": [
      "conjoint collaborateur"
    ],
    "références": {
      "Site web": "https://www.lacipav.fr/",
      "article de loi (chercher \"travailleurs indépendants créant leur activité\")": "https://www.legifrance.gouv.fr/eli/loi/2017/12/30/CPAX1725580L/jo/texte#JORFARTI000036339157",
      "guide pratique CIPAV 2022": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf"
    },
    "formule": {
      "une de ces conditions": [
        "métier = 'rattaché CIPAV'",
        {
          "toutes ces conditions": [
            "entreprise . date de création < 01/2019",
            "option régime général = non",
            "entreprise . activité . libérale réglementée = non"
          ]
        }
      ]
    }
  },
  "dirigeant . indépendant . PL . CIPAV . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "titre": "retraite complémentaire (CIPAV)",
    "unité": "€/an",
    "grille": {
      "assiette": "assiette des cotisations",
      "tranches": [
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 1527
              },
              {
                "si": "année = 2021",
                "alors": 1457
              }
            ]
          },
          "plafond": "26581 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 3055
              },
              {
                "si": "année = 2021",
                "alors": 2913
              }
            ]
          },
          "plafond": "49281 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 4582
              },
              {
                "si": "année = 2021",
                "alors": 4370
              }
            ]
          },
          "plafond": "57851 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 7637
              },
              {
                "si": "année = 2021",
                "alors": 7283
              }
            ]
          },
          "plafond": "66401 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 10692
              },
              {
                "si": "année = 2021",
                "alors": 10196
              }
            ]
          },
          "plafond": "83061 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 16802
              },
              {
                "si": "année = 2021",
                "alors": 16023
              }
            ]
          },
          "plafond": "103181 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 18329
              },
              {
                "si": "année = 2021",
                "alors": 17479
              }
            ]
          },
          "plafond": "123301 €/an"
        },
        {
          "montant": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": 19857
              },
              {
                "si": "année = 2021",
                "alors": 18936
              }
            ]
          }
        }
      ]
    },
    "références": {
      "Guide CIPAV 2022": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf#page=14"
    }
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès": {
    "remplace": "cotisations et contributions . invalidité et décès",
    "titre": "invalidité et décès (CIPAV)",
    "formule": {
      "variations": [
        {
          "si": "classe de cotisation = 'A'",
          "alors": "76 €/an"
        },
        {
          "si": "classe de cotisation = 'B'",
          "alors": "228 €/an"
        },
        {
          "si": "classe de cotisation = 'C'",
          "alors": "380 €/an"
        }
      ]
    }
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation": {
    "question": "Dans quelle classe cotisez-vous pour le régime invalidité-décès de la CIPAV ?",
    "description": "La Cipav gère un régime de prévoyance versant une pension en cas d'invalidité permanente et un capital décès ainsi qu’une rente pour les conjoints et enfants survivants en cas de décès de l'assuré. Par défaut les affiliés cotisent en « classe A » mais il est possible de cotiser en classe B ou C afin de bénéficier d'une meilleure couverture invalidité-décès.",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "A",
          "B",
          "C"
        ]
      }
    },
    "par défaut": "'A'"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation . A": {
    "titre": "classe A"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation . B": {
    "titre": "classe B"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation . C": {
    "titre": "classe C"
  },
  "dirigeant . indépendant . PL . CNAVPL": {
    "description": "La caisse nationale d'assurance vieillesse des professions libérales est\nl'organisme qui fédère les différentes caisses existantes (CIPAV, CARPIMKO,\nCARCDSF, CAVEC etc..)\n",
    "non applicable si": "régime général",
    "valeur": "oui"
  },
  "dirigeant . indépendant . PL . CNAVPL . retraite": {
    "titre": "retraite de base (CNAVPL)",
    "description": "Toutes les professions libérale (à l'exception des avocats)\nont les mêmes taux de cotisations pour leur retraite de base.\n",
    "produit": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . retraite"
      },
      "composantes": [
        {
          "attributs": {
            "nom": "tranche T1",
            "arrondi": "oui"
          },
          "taux": "8.23%",
          "plafond": "plafond sécurité sociale temps plein"
        },
        {
          "attributs": {
            "nom": "tranche t2",
            "arrondi": "oui"
          },
          "taux": "1.87%",
          "plafond": "5 * plafond sécurité sociale temps plein"
        }
      ]
    },
    "références": {
      "cnavpl.fr": "https://www.cnavpl.fr/preparer-sa-retraite/",
      "cotisation minimale (Guide CNAVPL)": "https://www.cnavpl.fr/wp-content/uploads/2020/10/guide-site-2020.pdf#page=21",
      "liste des caisses": "https://www.cnavpl.fr/regimes-complementaires-et-prevoyance/",
      "Guide CNAVPL (PDF)": "https://www.cnavpl.fr/statuts-et-documents-de-reference/?wpdmdl=56215"
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . retraite . remplace": {
    "titre": "retraite de base (CNAVPL)",
    "non applicable si": {
      "une de ces conditions": [
        "PL . CNBF",
        "PL . CARMF"
      ]
    },
    "remplace": "cotisations et contributions . retraite de base",
    "formule": "CNAVPL . retraite"
  },
  "dirigeant . indépendant . PL . CNAVPL . indemnités journalières": {
    "description": "Depuis le 1er juillet 2021 les affiliés à l’une des caisses de retraite de\nla CNAVPL peuvent bénéficier des indemnités journalières lors d’un arrêt\nmaladie.\n\nEn conséquence une nouvelle cotisation est créée.\n",
    "remplace": "cotisations et contributions . indemnités journalières maladie",
    "non applicable si": "PL . CNBF",
    "formule": {
      "produit": {
        "assiette": {
          "valeur": "assiette des cotisations",
          "plafond": "3 * plafond sécurité sociale temps plein",
          "plancher": "40% * plafond sécurité sociale temps plein"
        },
        "taux": {
          "variations": [
            {
              "si": "année = 2022",
              "alors": "0.3%"
            },
            {
              "si": "année = 2021",
              "alors": "0.15%"
            }
          ]
        }
      },
      "arrondi": "oui"
    },
    "références": {
      "Communiqué de la CNAVPL": "https://www.cnavpl.fr/les-pl-indemnises-des-ij/"
    }
  },
  "dirigeant . indépendant . PL . PAMC": {
    "applicable si": {
      "une de ces conditions": [
        {
          "toutes ces conditions": [
            "métier = 'santé . médecin'",
            "métier . secteur médecin != 'non conventionné'"
          ]
        },
        "métier = 'santé . sage-femme'",
        "métier = 'santé . chirurgien-dentiste'",
        "métier = 'santé . auxiliaire médical'"
      ]
    },
    "rend non applicable": [
      "conjoint collaborateur",
      "entreprise . chiffre d'affaires . franchise de TVA",
      "dirigeant . indépendant . revenus étrangers",
      "dirigeant . indépendant . cotisations et contributions . maladie domiciliation fiscale étranger"
    ],
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . PAMC . proportion recette activité non conventionnée": {
    "question": "Quel est la part de votre chiffre d'affaires liée à une activité non\nconventionnée (estimation) ?\n",
    "par défaut": "0%",
    "suggestions": {
      "10%": "10%",
      "30%": "30%"
    },
    "description": "Les recettes non conventionnées sont toutes celles qui ne rentrent pas dans\nles catégories suivantes :\n\n- Honoraires tirés des actes remboursables (y compris les\ndépassements d’honoraires et les frais de déplacement figurant sur le relevé\nSNIR)\n\n- Honoraires issus de rétrocessions concernant les actes remboursables\nperçues en qualité de remplaçant\n\n- Toutes les rémunérations forfaitaires versées par l’assurance maladie\n(aide à la télétransmission, indemnisation, indemnisation de la formation\ncontinue, prime à l’installation, ...)\n"
  },
  "dirigeant . indépendant . PL . PAMC . proportion recette activité non conventionnée . notification": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "proportion recette activité non conventionnée > 100%",
    "description": "La proportion ne peut pas être supérieure à 100%\n"
  },
  "dirigeant . indépendant . PL . PAMC . remplaçant": {
    "question": "Au 1er janvier 2020, exerciez-vous votre activité exclusivement en tant que remplaçant ?",
    "description": "Les practicien et auxiliaire médical exerçant une activité de remplacement ne sont pas redevables de la contribution aux unions régionales des professionnels de santé (CURPS)\n",
    "par défaut": "non"
  },
  "dirigeant . indépendant . PL . PAMC . CURPS": {
    "titre": "Contribution aux unions régionales des professionnels de santé",
    "remplace": "cotisations et contributions . contributions spéciales",
    "description": "Les professions libérales de santé sont représentées par des unions\nrégionales des professionnels de santé qui contribuent à l’organisation et à\nl’évolution de l’offre de santé au niveau régional, notamment à la\npréparation du projet régional de santé et à sa mise en œuvre.\n\nCes unions sont financées par une contribution recouvrée par l’Urssaf : la\ncontribution aux unions régionales des professionnels de santé (Curps).\n",
    "note": "Les remplaçants, quelle que soit leur activité, ne sont pas redevables de la\nCurps. Si la Curps est présente sur leur échéancier de cotisations, ils sont\ninvités à se rapprocher de leur Urssaf pour que leur dossier cotisant soit\nrégularisé. Un nouvel échéancier de cotisations sera ensuite adressé.\n",
    "acronyme": "CURPS",
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . date de création < 01/2020",
        "revenu professionnel > 0"
      ]
    },
    "non applicable si": {
      "une de ces conditions": [
        "métier . secteur médecin = 'non conventionné'",
        "remplaçant"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": {
          "variations": [
            {
              "si": "métier = 'santé . médecin'",
              "alors": "0.5%"
            },
            {
              "si": "métier = 'santé . chirurgien-dentiste'",
              "alors": "0.3%"
            },
            {
              "sinon": "0.1%"
            }
          ]
        }
      },
      "plafond": "0.50% * plafond sécurité sociale temps plein",
      "arrondi": "oui"
    },
    "références": {
      "Fiche Urssaf.fr": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations/la-contribution-aux-unions-regio/la-base-de-calcul-et-le-taux-de.html"
    }
  },
  "dirigeant . indépendant . PL . PAMC . maladie": {
    "remplace": "cotisations et contributions . maladie",
    "titre": "maladie (après participation CPAM)",
    "formule": {
      "somme": [
        {
          "produit": {
            "assiette": "assiette des cotisations",
            "taux": "6.50%"
          },
          "arrondi": "oui"
        },
        "contribution additionnelle",
        "(- participation CPAM)"
      ]
    }
  },
  "dirigeant . indépendant . PL . PAMC . dépassement d'honoraire moyen": {
    "non applicable si": "métier . secteur médecin = 'S1'",
    "question": "Quels est votre dépassement honoraires moyen (estimation) ?",
    "par défaut": "0%"
  },
  "dirigeant . indépendant . PL . PAMC . revenus activité conventionnée": {
    "description": "Les revenus conventionnés sont ceux correspondant aux recettes tirées des\nhonoraires et des rémunérations forfaitaires versées par la CPAM.\n",
    "note": "Pour éviter d'avoir à ventiler les charges entre celles issues de\nl'activités conventionnées et celles qui ne le sont pas (ce qui aboutirait à\ndeux comptabilités distinct), on peut le calculer à partir du revenu\nprofessionnel que l'on ajuste en fonction de la part du chiffre d'affaires\nprovenant des actes conventionnés.\n",
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "facteur": {
          "valeur": "100% - proportion recette activité non conventionnée",
          "plancher": "0%"
        }
      }
    }
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation CPAM": {
    "description": "Aussi appelé revenu conventionnel, il s'agit du revenu des honoraires nets de dépassement.",
    "formule": "revenus activité conventionnée  / (100% + dépassement d'honoraire moyen)",
    "note": "La formule référencée dans les textes Urssaf est la suivante :\n> (revenu de l’activité conventionnée) x (total des honoraires - total des dépassements d’honoraires) / montant total des honoraires.\n\nOn peut simplififer cette formule en :\n> (revenu de l’activité conventionnée) / (100% + dépassement d'honoraire moyen)\n\n### Preuve\nSi on prends les variables suivantes,\n> `h+` : total des honoraires (avec dépassement)\n  `h` : honoraires sans dépassement\n  `d%`: pourcentage de dépassement d'honoraire moyen\n\nOn a :\n>\n  `h+ = h + h * d%`\n  `h+ = h * (100% + d%)`\n\nSi on remplace dans la formule de l'assiette participation CPAM, on a :\n> 1. `(revenu de l’activité conventionnée) * h / h+`\n> 2. `(revenu de l’activité conventionnée) * h / (h * (100% + d%))\n> 3. `(revenu de l’activité conventionnée) / (100% + d%)`\n",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/praticien-et-auxiliaire-medical/mes-cotisations/le-calcul-de-mes-cotisations/la-participation-de-la-cpam-a-me/je-suis-medecin-du-secteur-1/assiette-de-participation-de-la.html"
    }
  },
  "dirigeant . indépendant . PL . PAMC . maladie . participation CPAM": {
    "non applicable si": "métier . secteur médecin = 'S2'",
    "titre": "Participation CPAM à la maladie",
    "formule": {
      "produit": {
        "assiette": "assiette participation CPAM",
        "taux": "6.40%"
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . PAMC . maladie . contribution additionnelle": {
    "formule": {
      "produit": {
        "assiette": "(assiette des cotisations - assiette participation CPAM)",
        "taux": "3.25%"
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . PAMC . allocations familiales": {
    "applicable si": "métier . secteur médecin = 'S1'",
    "titre": "allocations familiales (après participation CPAM)",
    "remplace": {
      "règle": "cotisations et contributions . allocations familiales",
      "sauf dans": "participation CPAM"
    },
    "formule": {
      "valeur": "cotisations et contributions . allocations familiales",
      "abattement": "participation CPAM"
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations/les-praticiens-et-auxiliaires-me/taux-de-cotisations-medecin-sect.html"
    }
  },
  "dirigeant . indépendant . PL . PAMC . allocations familiales . participation CPAM": {
    "titre": "Participation CPAM aux allocations familiales",
    "formule": {
      "produit": {
        "assiette": "cotisations et contributions . allocations familiales",
        "taux": {
          "grille": {
            "assiette": "assiette participation CPAM",
            "multiplicateur": "plafond sécurité sociale temps plein",
            "tranches": [
              {
                "montant": "100%",
                "plafond": "140%"
              },
              {
                "montant": "75%",
                "plafond": "250%"
              },
              {
                "montant": "60%"
              }
            ]
          }
        }
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation chirurgien-dentiste": {
    "applicable si": "métier = 'santé . chirurgien-dentiste'",
    "titre": "assiette participation CPAM (chirurgien dentiste)",
    "remplace": "assiette participation CPAM",
    "formule": {
      "produit": {
        "assiette": "revenus activité conventionnée",
        "taux": "1 - taux Urssaf / (1 + taux Urssaf)"
      }
    },
    "référence": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/praticien-et-auxiliaire-medical/mes-cotisations/le-calcul-de-mes-cotisations/la-participation-de-la-cpam-a-me/je-suis-chirurgien-dentiste/assiette-de-participation-de-la.html",
      "Texte de loi": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000020429271&categorieLien=id"
    }
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation chirurgien-dentiste . taux Urssaf": {
    "description": "Le « taux Urssaf » (taux UR) permet de calculer la part de votre\ncotisation d’assurance maladie-maternité prise en charge par la CPAM.\n\nCe taux est pré-rempli sur votre déclaration de revenus professionnels. Il\nest issu des données de votre Relevé individuel d’activité et de\nprescriptions (RIAP).\n\nPlus le taux est faible, plus la participation CPAM est importante et donc\nla part à la charge du praticien est faible.\n\n## Calcul du taux\n\nLa formule de calcul du taux de dépassement est la suivante :\n> Taux Urssaf = (dépassements - montants remboursés forfaits CMU) / (montants remboursables actes + montants remboursés forfaits CMU)\n",
    "question": "Quel est votre \"taux Urssaf\" ?",
    "unité": "",
    "par défaut": 1
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation chirurgien-dentiste . taux Urssaf . notification": {
    "formule": "taux Urssaf >= 100",
    "type": "notification",
    "sévérité": "avertissement",
    "description": "Le taux Urssaf doit être inférieur à 100"
  },
  "dirigeant . indépendant . PL . PAMC . participation CPAM": {
    "titre": "Participation assurance maladie",
    "description": "Les professionnels de santé conventionnés bénéficient d'une prise en charge d'une partie de leur cotisations par l'Assurance Maladie.\n",
    "formule": {
      "somme": [
        "PAMC . allocations familiales . participation CPAM",
        "PAMC . maladie . participation CPAM",
        "CARMF . ASV . participation CPAM",
        "CARPIMKO . ASV . participation CPAM",
        "CARCDSF . chirurgien-dentiste . PCV . participation CPAM",
        "CARCDSF . sage-femme . PCV . participation CPAM",
        "CARMF . retraite CNAVPL . participation CPAM"
      ],
      "arrondi": "oui"
    },
    "références": {
      "amelie.fr": "https://www.ameli.fr/assure/droits-demarches/salaries-travailleurs-independants-et-personnes-sans-emploi/emploi-independant-non-salarie/praticien-auxiliaire-medical",
      "rapport sécurité sociale 2009": "https://www.securite-sociale.fr/files/live/sites/SSFR/files/medias/CCSS/2009/RAPPORT/CCSS-RAPPORT-JUIN_2009-FICHE-LA_PRISE_EN_CHARGE_DES_COTISATIONS_DES_PRATICIENS_ET_AUXILIAIRES_MEDICAUX.pdf"
    }
  },
  "dirigeant . indépendant . PL . PAMC . IJSS": {
    "remplace": "indépendant . IJSS . imposable",
    "rend non applicable": "indépendant . IJSS",
    "titre": "indemnités journalières de sécurité sociale",
    "description": "Les indemnités journalières de Sécurité sociale (IJSS) sont versées dans le cas de congé maternité/paternité/adoption.\n\nLa CSG-CRDS est automatiquement précomptée par l'Assurance maladie lors du versement. Leur montant est donc retranché à l'assiette pour le calcul de la CSG-CRDS restante dûe.\n\nLes indemnités complémentaires aux indemnités journalières de la Sécurité sociale versées dans le cadre d’un contrat de prévoyance ne constituent pas des revenus de remplacement.\nNote: Les prestations d’invalidité versées par les régimes d’invalidité-décès ne sont pas concernées.",
    "question": "Quel est le montant des indemnités journalières de maternité ou paternité perçu au titre de votre activité libérale ?",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . PL . CAVP": {
    "description": "La CAVP est la caisse de retraite des pharmaciens.",
    "formule": "oui",
    "applicable si": "métier = 'santé . pharmacien'",
    "références": {
      "Site CAVP": "https://www.cavp.fr/"
    }
  },
  "dirigeant . indépendant . PL . CAVP . directeur non médecin": {
    "applicable si": "métier = 'santé . pharmacien'",
    "par défaut": "non",
    "question": "Êtes-vous biologiste médical conventionné ?"
  },
  "dirigeant . indépendant . PL . CAVP . demande reduction": {
    "type": "notification",
    "formule": {
      "une de ces conditions": [
        "assiette des cotisations < 1.8125 * plafond sécurité sociale temps plein",
        "entreprise . durée d'activité <= 2 an"
      ]
    },
    "résumé": "Une réduction de cotisations peut être demandée les 2 premières années, ou\nen cas de revenus faibles. Ainsi, si vos revenus de l'avant-dernière année,\nou de l'année précédente s'ils sont connus (soit 2018 ou 2019 pour les cotisations\n2020), étaient :\n  - inférieurs à 1/3 du PASS (13 712 € en 2020), vous pouvez demander une réduction de 75 % ;\n  - entre 1/3 et 2/3 du PASS (entre 13 712 et 27 423 € en 2020), vous pouvez demander une réduction de 50 % ;\n  - entre 2/3 du PASS et le PASS (entre 27 424 € et 41 135 € en 2020), vous pouvez demander une réduction de 25 %.\n\nCette possibilité est réservée aux pharmaciens qui cotisent en classe 3 (la plus basse).\n",
    "références": {
      "CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/quelles-possibilit%C3%A9s-en-cas-de-difficult%C3%A9s"
    }
  },
  "dirigeant . indépendant . PL . CAVP . cotisation de référence": {
    "valeur": {
      "variations": [
        {
          "si": "année = 2022",
          "alors": "1232 €"
        },
        {
          "si": "année = 2021",
          "alors": "1200 €"
        }
      ]
    },
    "reference": {
      "site cavp.fr": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire"
    }
  },
  "dirigeant . indépendant . PL . CAVP . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "titre": "retraite complémentaire (CAVP)",
    "formule": "part géré par répartition + part géré par capitalisation",
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire",
      "Legifrance": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039357705"
    }
  },
  "dirigeant . indépendant . PL . CAVP . retraite complémentaire . part géré par répartition": {
    "formule": "5 * cotisation de référence",
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire",
      "Legifrance": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039357705"
    }
  },
  "dirigeant . indépendant . PL . CAVP . retraite complémentaire . part géré par capitalisation": {
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale temps plein",
        "tranches": [
          {
            "montant": "2 * cotisation de référence",
            "plafond": 1.8125
          },
          {
            "montant": "3 * cotisation de référence",
            "plafond": 2.1875
          },
          {
            "montant": "4 * cotisation de référence",
            "plafond": 2.5625
          },
          {
            "montant": "5 * cotisation de référence",
            "plafond": 2.9375
          },
          {
            "montant": "6 * cotisation de référence",
            "plafond": 3.3125
          },
          {
            "montant": "7 * cotisation de référence",
            "plafond": 3.6875
          },
          {
            "montant": "8 * cotisation de référence",
            "plafond": 4.0625
          },
          {
            "montant": "9 * cotisation de référence",
            "plafond": 4.4375
          },
          {
            "montant": "10 * cotisation de référence",
            "plafond": 4.8125
          },
          {
            "montant": "11 * cotisation de référence",
            "plafond": 5.1875
          },
          {
            "montant": "12 * cotisation de référence"
          }
        ]
      }
    },
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire",
      "Legifrance": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039357705"
    }
  },
  "dirigeant . indépendant . PL . CAVP . invalidité et décès": {
    "titre": "invalidité et décès (CAVP)",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": "608 €/an",
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV": {
    "titre": "Prestation complémentaire de vieillesse (CAVP)",
    "remplace": "cotisations et contributions . PCV",
    "applicable si": "dirigeant . indépendant . PL . CAVP . directeur non médecin",
    "formule": {
      "somme": [
        "cotisations forfaitaire",
        "cotisations proportionnelle",
        "(- aide CPAM)"
      ],
      "arrondi": "oui"
    },
    "référence": {
      "Taux 2021 (CAVP)": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-des-prestations-complementaires-vieillesse",
      "La retraite en claire": "https://www.la-retraite-en-clair.fr/parcours-professionnel-regimes-retraite/retraite-travailleurs-independants/retraite-complementaire-pharmaciens-cavp"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . cotisations forfaitaire": {
    "variations": [
      {
        "si": "année = 2022",
        "alors": "1788 €/an"
      },
      {
        "si": "année = 2021",
        "alors": "1728 €/an"
      }
    ],
    "références": {
      "site cavp.fr": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-des-prestations-complementaires-vieillesse"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . cotisations proportionnelle": {
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": "0.30%",
        "plafond": "5 * plafond sécurité sociale temps plein"
      }
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . aide CPAM": {
    "somme": [
      "aide CPAM forfaitaire",
      "aide CPAM proportionnelle"
    ],
    "référence": {
      "CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-des-prestations-complementaires-vieillesse",
      "La retraite en claire": "https://www.la-retraite-en-clair.fr/parcours-professionnel-regimes-retraite/retraite-travailleurs-independants/retraite-complementaire-pharmaciens-cavp"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . aide CPAM forfaitaire": {
    "formule": "66% * cotisations forfaitaire"
  },
  "dirigeant . indépendant . PL . CAVP . PCV . aide CPAM proportionnelle": {
    "formule": "50% * cotisations proportionnelle"
  },
  "dirigeant . indépendant . PL . CARPIMKO": {
    "description": "La CARPIMKO est la caisse de retraite autonome des auxiliaires médicaux.",
    "formule": "oui",
    "applicable si": "métier = 'santé . auxiliaire médical'",
    "références": {
      "Site CARPIMKO": "https://www.carpimko.com"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "titre": "retraite complémentaire (CARPIMKO)",
    "formule": {
      "somme": [
        {
          "variations": [
            {
              "si": "année = 2022",
              "alors": "1840 €/an"
            },
            {
              "si": "année = 2021",
              "alors": "1648 €/an"
            }
          ]
        },
        {
          "barème": {
            "assiette": "assiette des cotisations",
            "tranches": [
              {
                "taux": "0%",
                "plafond": "25246 €/an"
              },
              {
                "taux": "3%",
                "plafond": {
                  "variations": [
                    {
                      "si": "année = 2022",
                      "alors": "193913 €/an"
                    },
                    {
                      "si": "année = 2021",
                      "alors": "176413 €/an"
                    }
                  ]
                }
              }
            ]
          },
          "arrondi": "oui"
        }
      ]
    },
    "références": {
      "Site CARPIMKO": "https://www.carpimko.com/je-suis-en-activite/mes-cotisations/mes-cotisations-sadaptent-a-mes-revenus"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . invalidité et décès": {
    "titre": "invalidité et décès (CARPIMKO)",
    "remplace": "cotisations et contributions . invalidité et décès",
    "variations": [
      {
        "si": "année = 2022",
        "alors": "776 €/an"
      },
      {
        "si": "année = 2021",
        "alors": "678 €/an"
      }
    ],
    "références": {
      "Site CARPIMKO": "https://www.carpimko.com/je-suis-en-activite/mes-cotisations/mes-cotisations-sadaptent-a-mes-revenus"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . ASV": {
    "titre": "Avantage social vieillesse (CARPIMKO)",
    "remplace": "cotisations et contributions . PCV",
    "formule": {
      "somme": [
        {
          "nom": "forfaitaire",
          "variations": [
            {
              "si": "année = 2022",
              "alors": "601 €/an"
            },
            {
              "si": "année = 2021",
              "alors": "590 €/an"
            }
          ]
        },
        {
          "nom": "proportionnelle",
          "produit": {
            "assiette": "PAMC . assiette participation CPAM",
            "taux": "0.40%"
          }
        },
        "(- participation CPAM)"
      ],
      "arrondi": "oui"
    },
    "références": {
      "Taux 2020": "http://www.carpimko.com/cotisations/cotisations_cas_general"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . ASV . participation CPAM": {
    "titre": "Participation CPAM à l'avantage social vieillesse",
    "applicable si": "PAMC",
    "formule": {
      "somme": [
        {
          "produit": {
            "assiette": "forfaitaire",
            "taux": "2 / 3"
          },
          "arrondi": "oui"
        },
        "60% * proportionnelle"
      ]
    },
    "références": {
      "Prise en charge CPAM": "http://www.carpimko.com/cotisations/cotisations_cas_general"
    }
  },
  "dirigeant . indépendant . PL . CARMF": {
    "formule": "oui",
    "description": "La CARMF est la caisse de retraite autonome des médecins de France.\n",
    "applicable si": "métier = 'santé . médecin'",
    "références": {
      "Site CARMF": "http://www.carmf.fr"
    },
    "note": "L’affiliation est obligatoire pour les médecins titulaires du diplôme de\ndocteur en médecine, inscrits au conseil de l’Ordre et exerçant une activité\nlibérale (installation, remplacements, expertises pour les compagnies\nd’assurance ou les laboratoires privés, secteur privé à l’hôpital, en\nsociété d’exercice libéral ou toute autre activité rémunérée sous forme\nd’honoraires, même s’il ne s’agit pas de la médecine de soins) en France\nmétropolitaine et dans les départements d’Outre-Mer ou à Monaco.\n"
  },
  "dirigeant . indépendant . PL . CARMF . retraite CNAVPL": {
    "titre": "retraite de base CNAVPL (après participation CPAM)",
    "applicable si": "métier . secteur médecin = 'S1'",
    "description": "Pour compenser la hausse de la CSG, les médecins de secteur 1 bénéficient d'une participation de l'assurance maladie (avenant n°5 de la convention médicale) au financement de leurs cotisations du régime de base.\n",
    "remplace": "cotisations et contributions . retraite de base",
    "formule": {
      "valeur": "CNAVPL . retraite",
      "abattement": "participation CPAM"
    },
    "références": {
      "Avenant 5 à la convention médical": "https://www.ameli.fr/sites/default/files/Documents/434342/document/avis_relatif_a_lavenant_ndeg_5_a_la_convention_nationale_organisant_les_rapports_entre_les_medecins_liberaux_et_lassurance_maladie.pdf"
    }
  },
  "dirigeant . indépendant . PL . CARMF . retraite CNAVPL . participation CPAM": {
    "titre": "participation CPAM à la retraite de base",
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": {
          "grille": {
            "assiette": "assiette des cotisations",
            "multiplicateur": "plafond sécurité sociale temps plein",
            "tranches": [
              {
                "montant": "2.15%",
                "plafond": "140%"
              },
              {
                "montant": "1.51%",
                "plafond": "250%"
              },
              {
                "montant": "1.12%"
              }
            ]
          }
        }
      },
      "arrondi": "oui"
    },
    "références": {
      "Avenant 5 à la convention médical": "https://www.ameli.fr/sites/default/files/Documents/434342/document/avis_relatif_a_lavenant_ndeg_5_a_la_convention_nationale_organisant_les_rapports_entre_les_medecins_liberaux_et_lassurance_maladie.pdf"
    }
  },
  "dirigeant . indépendant . PL . CARMF . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "description": "La CARMF gère le régime de retraite complémentaire.\nLe montant des cotisations est déterminé en fonction des revenus nets d’activité indépendante de l’avant-dernière année.\nLes cotisations des deux premières années d’affiliation ne sont pas dues, sauf si vous étes âgé de plus de 40 ans au début de votre activité libérale. Dans ce cas, la cotisation est proportionnelle aux revenus nets d'activité indépendante de 2018 plafonnés, sans régularisation ultérieure, avec une cotisation maximale de 14 110 €.",
    "titre": "retraite complémentaire (CARMF)",
    "arrondi": "oui",
    "variations": [
      {
        "si": "entreprise . durée d'activité . en fin d'année < 2 ans",
        "alors": "0€/an"
      },
      {
        "sinon": {
          "produit": {
            "assiette": "assiette des cotisations",
            "plafond": "3.5 * plafond sécurité sociale temps plein",
            "taux": "9.80%"
          }
        }
      }
    ],
    "références": {
      "Site CARMF": "http://www.carmf.fr/page.php?page=cdrom/coti/coti-chiffre.htm"
    }
  },
  "dirigeant . indépendant . PL . CARMF . invalidité décès": {
    "titre": "invalidité et décès (CARMF)",
    "remplace": "cotisations et contributions . invalidité et décès",
    "description": "La CARMF gère un régime de prévoyance versant une pension en cas d'invalidité permanente et un capital décès ainsi qu’une rente pour les conjoints et enfants survivants en cas de décès de l'assuré.\nLa cotisation comporte trois classes forfaitaires dont le montant est déterminé en fonction de vos revenus nets d'activité indépendante de l’avant-dernière année.\nSans communication des revenus professionnels non salariés et de l’avis d’imposition de l’avant dernière année, le taux d’indemnisation ne peut être fixé. Dans l’attente de la réception de ce document l’indemnisation sera basée sur le taux prévu pour la classe A.",
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale temps plein",
        "tranches": [
          {
            "montant": "631 €/an",
            "plafond": 1
          },
          {
            "montant": "738 €/an",
            "plafond": 3
          },
          {
            "montant": "863 €/an"
          }
        ]
      }
    },
    "références": {
      "Montant des cotisations": "http://www.carmf.fr/page.php?page=cdrom/coti/coti-cours.htm#base",
      "Détails des couvertures": "http://www.carmf.fr/page.php?page=cdrom/prev/prev-chiffre.htm"
    }
  },
  "dirigeant . indépendant . PL . CARMF . ASV": {
    "titre": "Allocations supplémentaires de vieillesse (CARMF)",
    "remplace": "cotisations et contributions . PCV",
    "description": "Le régime des allocations supplémentaires de vieillesse (ASV) s'applique pour les médecins conventionnés.\nIl fonctionne en points et comprend une part forfaitaire et une part d’ajustement calculée sur le revenu conventionnel de N-2.\nLes deux tiers de la cotisation des médecins en secteur 1 sont financés par les Caisses maladie.",
    "non applicable si": "métier . secteur médecin = 'non conventionné'",
    "formule": {
      "valeur [ref assiette]": {
        "somme": [
          "5325 €/an",
          {
            "produit": {
              "assiette": "PAMC . revenus activité conventionnée",
              "plafond": "5 * plafond sécurité sociale temps plein",
              "taux": "3.80%"
            }
          }
        ]
      },
      "abattement": "participation CPAM",
      "arrondi": "oui"
    },
    "références": {
      "Taux 2021": "http://www.carmf.fr/page.php?page=chiffrescles/stats/2021/taux2021.htm"
    }
  },
  "dirigeant . indépendant . PL . CARMF . ASV . participation CPAM": {
    "titre": "Participation CPAM aux allocations supplémentaires de vieillesse",
    "applicable si": "métier . secteur médecin = 'S1'",
    "formule": {
      "produit": {
        "assiette": "assiette",
        "taux": "2 / 3"
      }
    }
  },
  "dirigeant . indépendant . PL . CARCDSF": {
    "formule": "oui",
    "description": "La CARCDSF est la caisse de retraite des chirurgiens dentiste et des sages femmes.\n",
    "applicable si": {
      "une de ces conditions": [
        "métier = 'santé . chirurgien-dentiste'",
        "métier = 'santé . sage-femme'"
      ]
    },
    "références": {
      "Site Web": "http://www.carcdsf.fr"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire": {
    "titre": "retraite complémentaire (CARCDSF)",
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "somme": [
        "cotisation forfaitaire",
        "cotisation proportionnelle"
      ]
    },
    "références": {
      "Site CARCDSF": "http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation proportionnelle": {
    "formule": {
      "barème": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale temps plein",
        "tranches": [
          {
            "taux": "0%",
            "plafond": 0.85
          },
          {
            "taux": "10.65%",
            "plafond": 5
          }
        ]
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation forfaitaire": {
    "formule": {
      "produit": {
        "assiette": "2960.40 €/an",
        "facteur": {
          "variations": [
            {
              "si": "taux réduction",
              "alors": "taux réduction"
            },
            {
              "sinon": "100%"
            }
          ]
        }
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation forfaitaire . réduction applicable": {
    "formule": "assiette des cotisations < 85% * plafond sécurité sociale temps plein",
    "description": "Vous avez la possibilité de bénéficier d'une réduction de cotisation\npour la retraite complémentaire si vous en faites la demande. [En savoir\nplus](/documentation/dirigeant/indépendant/PL/CARCDSF/retraite-complémentaire/cotisation-forfaitaire/taux-réduction)\n",
    "type": "notification"
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation forfaitaire . taux réduction": {
    "applicable si": "réduction applicable",
    "description": "Les affiliés dont les revenus professionnels nets sur l'année N-1 sont inférieurs à 85\n% du PASS en vigueur au 1er janvier de l’année considérée (34 966 € en 2020)\npeuvent, sur demande, obtenir une réduction de la cotisation forfaitaire.\n\nLe coefficient de réduction appliqué est égal au rapport des revenus\nprofessionnels non-salariés sur le seuil mentionné ci-dessus.\n\nLa demande doit être adressée à la CARCDSF et être accompagnée d’une\nphotocopie de la déclaration d’impôt n° 2042 C ou 2035 ou 2065 et de leurs\nannexes (2033 B et D ou 2053 et 2058 A) de l’année 2019.\n",
    "unité": "%",
    "formule": "assiette des cotisations / (85% * plafond sécurité sociale temps plein)",
    "références": {
      "Site CARCDSF": "http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste": {
    "applicable si": "métier = 'santé . chirurgien-dentiste'",
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . RID": {
    "titre": "invalidité et décès (CARCDSF chirurgien-dentiste)",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": "1078 €/an"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . PCV": {
    "titre": "Prestation complémentaire vieillesse (CARCDSF chirurgien-dentiste)",
    "remplace": "cotisations et contributions . PCV",
    "non applicable si": "exonération PCV",
    "note": "Une dispense peut être accordée lorsque les revenus professionnels 2019 sont inférieurs ou égaux à 500 C (valeur au 1er janvier de l’année considérée), soit 11 500 €.\nLa demande doit être accompagnée d’une photocopie de la déclaration d’impôt n° 2042 C ou 2035 ou 2065 et de leurs annexes (2033 B et D ou 2053 et 2058 A) de l’année 2019.\nCette dispense entraîne l’annulation des droits pour l’année et les points non cotisés ne sont pas rachetables.",
    "formule": {
      "somme": [
        "forfaitaire",
        "proportionnelle"
      ],
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . PCV . forfaitaire": {
    "formule": "1440.60 €/an"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . PCV . proportionnelle": {
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "plafond": "5 * plafond sécurité sociale temps plein",
        "taux": "0.725 %"
      }
    },
    "références": {
      "Site CARCDSF": "http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . PCV . participation CPAM": {
    "titre": "Participation CPAM à la prestation complémentaire vieillesse",
    "formule": {
      "somme": [
        "2 * forfaitaire",
        "proportionnelle"
      ]
    },
    "références": {
      "Guide CARCDSF (PDF, page 6)": "http://www.carcdsf.fr/images/memento/0872-19_CARCDSF_MEMENTO_2020_CHIRURGIENS_DENTISTES-WEB.pdf"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . exonération PCV": {
    "type": "notification",
    "formule": "(assiette des cotisations / prix d'une consultation) <=  500 consultation/an",
    "description": "Vous avez la possibilité de bénéficier d'une exonération totale de cotisation pour la prestation complémentaire de vieillesse (PCV) si vous en faites la demande. [En savoir plus](http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations)"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . prix d'une consultation": {
    "formule": "23 €/consultation"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme": {
    "applicable si": "métier = 'santé . sage-femme'",
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID": {
    "titre": "invalidité et décès (CARCDSF sage-femme)",
    "description": "Il existe classes de cotisations aux choix, correspondant à des cotisations\net des degrés d'indemnisations différents.\n\nLe changement d'option pour une classe supérieure doit être demandé avant le\n1er juillet de l'année en cours, pour prendre effet au 1er janvier de\nl'année suivante.\n\nAucun changement de classe n'est autorisé après le 1er juillet du 56e anniversaire.\n",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "variations": [
        {
          "si": "classe = 'A'",
          "alors": "91 €/an"
        },
        {
          "si": "classe = 'B'",
          "alors": "182 €/an"
        },
        {
          "si": "classe = 'C'",
          "alors": "273 €/an"
        }
      ]
    },
    "références": {
      "Montant des cotisations": "http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe": {
    "titre": "Classe de cotisation",
    "question": "Dans quelle classe cotisez-vous pour le régime invalidité-décès de la CARCDSF ?",
    "description": "Il existe classes de cotisations aux choix, correspondant à des cotisations\net des degrés d'indemnisations différents.\n",
    "par défaut": "'A'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "A",
          "B",
          "C"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe . A": {
    "titre": "classe A"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe . B": {
    "titre": "classe B"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe . C": {
    "titre": "classe C"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . PCV": {
    "remplace": "cotisations et contributions . PCV",
    "non applicable si": "exonération PCV",
    "description": "Pour 2020, le montant est fixé à 780 € dont un tiers, soit 260 € à votre\ncharge et 520 € à la charge des Caisses Primaires d’Assurance Maladie\n(CPAM).\n",
    "formule": {
      "valeur": "780 €/an",
      "abattement [ref participation CPAM]": "520 €/an"
    },
    "références": {
      "Site CARCDSF": "http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    },
    "note": "Une dispense peut être accordée lorsque les revenus professionnels sont\ninférieurs ou égaux à 3120 €.\n\nLa demande doit être accompagnée d’une photocopie de la déclaration d’impôt\nn° 2042 C ou 2035 ou 2065 et de leurs annexes (2033 B et D ou 2053 et 2058\nA).\n\nCette dispense entraîne l’annulation des droits pour l’année et les points\nnon cotisés ne sont pas rachetables.\n"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . exonération PCV": {
    "type": "notification",
    "formule": "assiette des cotisations <= 3120 €/an",
    "description": "Vous avez la possibilité de bénéficier d'une exonération totale de cotisation pour la prestation complémentaire de vieillesse (PCV) si vous en faites la demande. [En savoir plus](http://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations)"
  },
  "dirigeant . indépendant . PL . CNBF": {
    "formule": "oui",
    "applicable si": "métier = 'avocat'",
    "description": "La Caisse Nationale des Barreaux Français (CNBF) est l’organisme de sécurité\nsociale des avocats.\n",
    "rend non applicable": [
      "cotisations et contributions . indemnités journalières maladie",
      "conjoint collaborateur"
    ],
    "références": {
      "Site CNBF": "https://www.cnbf.fr",
      "Barème 2020": "https://www.cnbf.fr/wp-content/uploads/2020/08/CNBF-bareme-des-cotisations-et-prestations-2020.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNBF . retraite de base": {
    "remplace": "cotisations et contributions . retraite de base",
    "formule": {
      "somme": [
        {
          "nom": "cotisation forfaitaire",
          "grille": {
            "assiette": "entreprise . durée d'activité . en fin d'année",
            "tranches": [
              {
                "montant": {
                  "variations": [
                    {
                      "si": "année = 2022",
                      "alors": "303 €/an"
                    },
                    {
                      "si": "année = 2021",
                      "alors": "290 €/an"
                    }
                  ]
                },
                "plafond": "1 an"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "année = 2022",
                      "alors": "608 €/an"
                    },
                    {
                      "si": "année = 2021",
                      "alors": "581 €/an"
                    }
                  ]
                },
                "plafond": "2 ans"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "année = 2022",
                      "alors": "954 €/an"
                    },
                    {
                      "si": "année = 2021",
                      "alors": "912 €/an"
                    }
                  ]
                },
                "plafond": "3 ans"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "année = 2022",
                      "alors": "1299 €/an"
                    },
                    {
                      "si": "année = 2021",
                      "alors": "1242 €/an"
                    }
                  ]
                },
                "plafond": "5 ans"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "année = 2022",
                      "alors": "1658 €/an"
                    },
                    {
                      "si": "année = 2021",
                      "alors": "1586 €/an"
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "nom": "cotisation proportionnelle",
          "produit": {
            "taux": "3.1%",
            "assiette": "assiette des cotisations",
            "plafond": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": "297549 €/an"
                },
                {
                  "si": "année = 2021",
                  "alors": "291718 €/an"
                }
              ]
            }
          }
        }
      ]
    },
    "références": {
      "barème 2022": "https://www.cnbf.fr/wp-content/uploads/2021/12/Bareme-CNBF-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNBF . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "titre": "retraite complémentaire (CNBF)",
    "barème": {
      "assiette": "assiette des cotisations",
      "multiplicateur": {
        "variations": [
          {
            "si": "année = 2022",
            "alors": "42507 €/an"
          },
          {
            "si": "année = 2021",
            "alors": "41674 €/an"
          }
        ]
      },
      "tranches": [
        {
          "taux": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "4.60%"
              },
              {
                "si": "année = 2021",
                "alors": "4%"
              }
            ]
          },
          "plafond": 1
        },
        {
          "taux": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "8.80%"
              },
              {
                "si": "année = 2021",
                "alors": "8%"
              }
            ]
          },
          "plafond": 2
        },
        {
          "taux": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "10.20%"
              },
              {
                "si": "année = 2021",
                "alors": "9.2%"
              }
            ]
          },
          "plafond": 3
        },
        {
          "taux": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "11.60%"
              },
              {
                "si": "année = 2021",
                "alors": "10.4%"
              }
            ]
          },
          "plafond": 4
        },
        {
          "taux": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "13%"
              },
              {
                "si": "année = 2021",
                "alors": "11.6%"
              }
            ]
          },
          "plafond": 5
        }
      ]
    },
    "arrondi": "oui",
    "note": "Il existe plusieurs classes de cotisations, qui permettent de cotiser\nd'avantage pour acquérir d'avantages de points. Seule la première classe est\nimplémentée pour l'instant.\n",
    "références": {
      "barème 2022": "https://www.cnbf.fr/wp-content/uploads/2021/12/Bareme-CNBF-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNBF . RID": {
    "titre": "invalidité et décès (CNBF avocat)",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "variations": [
        {
          "si": "entreprise . durée d'activité . en fin d'année < 5 ans",
          "alors": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "58 €/an"
              },
              {
                "si": "année = 2021",
                "alors": "55 €/an"
              }
            ]
          }
        },
        {
          "sinon": {
            "variations": [
              {
                "si": "année = 2022",
                "alors": "145 €/an"
              },
              {
                "si": "année = 2021",
                "alors": "137 €/an"
              }
            ]
          }
        }
      ]
    },
    "références": {
      "barème 2022": "https://www.cnbf.fr/wp-content/uploads/2021/12/Bareme-CNBF-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CAVEC": {
    "formule": "oui",
    "applicable si": "métier = 'expert-comptable'",
    "description": "La CAVEC est l’organisme de sécurité sociale des experts-comptables et des\ncommissaires aux comptes.\n",
    "rend non applicable": [
      "conjoint collaborateur"
    ],
    "références": {
      "Site CAVEC": "https://www.cavec.fr"
    }
  },
  "dirigeant . indépendant . PL . CAVEC . retraite complémentaire": {
    "titre": "retraite complémentaire (CAVEC)",
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "unité": "€/an",
        "tranches": [
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 670
                },
                {
                  "si": "année = 2021",
                  "alors": 648
                }
              ]
            },
            "plafond": "16190 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 2511
                },
                {
                  "si": "année = 2021",
                  "alors": 2430
                }
              ]
            },
            "plafond": "32350 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 3962
                },
                {
                  "si": "année = 2021",
                  "alors": 3834
                }
              ]
            },
            "plafond": "44790 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 6194
                },
                {
                  "si": "année = 2021",
                  "alors": 5994
                }
              ]
            },
            "plafond": "64560 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 9877
                },
                {
                  "si": "année = 2021",
                  "alors": 9558
                }
              ]
            },
            "plafond": "79040 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 15066
                },
                {
                  "si": "année = 2021",
                  "alors": 14580
                }
              ]
            },
            "plafond": "94850 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 16740
                },
                {
                  "si": "année = 2021",
                  "alors": 16200
                }
              ]
            },
            "plafond": "132780 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": 20925
                },
                {
                  "si": "année = 2021",
                  "alors": 20250
                }
              ]
            }
          }
        ]
      }
    },
    "références": {
      "Site CAVEC": "https://www.cavec.fr/fr/vos-cotisations-12/montant-des-cotisations-retraite-tns-59/montant-des-cotisations-62"
    }
  },
  "dirigeant . indépendant . PL . CAVEC . invalidité et décès": {
    "titre": "invalidité et décès (CAVEC)",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "unité": "€/an",
        "tranches": [
          {
            "montant": 288,
            "plafond": "16190 €/an"
          },
          {
            "montant": 396,
            "plafond": "44790 €/an"
          },
          {
            "montant": 612,
            "plafond": "79040 €/an"
          },
          {
            "montant": 828
          }
        ]
      }
    },
    "références": {
      "Site CAVEC": "https://www.cavec.fr/fr/vos-cotisations-12/montant-des-cotisations-retraite-tns-59/montant-des-cotisations-62"
    }
  },
  "protection sociale": {
    "description": "La protection sociale est composée de 5 branches principales : maladie, famille, accidents du travail et maladies professionnelles, retraite et chômage. A cela s'ajoutent aussi les cotisations pour la formation professionnelle et le transport.\n"
  },
  "protection sociale . retraite": {
    "icônes": "👵",
    "type": "branche",
    "résumé": "Garantit en moyenne 60 à 70 % du dernier revenu d'activité après 65 ans.",
    "description": "Tous les travailleurs en France cotisent tout au long de leur vie professionnelle pour bénéficier d’un régime de retraite dès lors qu’ils ont l’âge de cesser leur activité.\n\nLe système des retraites est actuellement fondé sur le principe de la « répartition ». Cela veut dire que les cotisations des actifs financent les pensions des retraités.\n\n## La retraite en France en quelques chiffres\n  - ** 2094 € / mois** :  Niveau de vie moyen des plus de 65 ans (en comparaison du reste de la population, c'est le plus élevé de l'OCDE 🥇)\n  - **25 ans** : le nombre d'années passées en moyenne à la retraite (le plus élevé de l'OCDE 🥇)\n  - **75 %** : le taux de remplacement en pourcentage du salaire net à taux plein\n\nLa retraite est la plus élevée des cotisations sociales. Elle peut être considérée comme un salaire différé, puisque vos cotisations vous assurerons un revenu futur.\n\nSimulez et gérez votre retraite sur [info-retraite.fr](https://www.info-retraite.fr/portail-info/home.html).\n",
    "références": {
      "CNAV": "https://www.lassuranceretraite.fr",
      "OCDE": "https://read.oecd-ilibrary.org/social-issues-migration-health/pensions-at-a-glance-2017_pension_glance-2017-en#page135",
      "INSEE": "https://www.insee.fr/fr/statistiques/fichier/3549496/REVPMEN18_F1.21_niv-pauv-pers-agees.pdf"
    },
    "formule": {
      "somme": [
        "base",
        "complémentaire salarié",
        "complémentaire indépendants"
      ]
    },
    "note": "Il s'agit d'une estimation a but purement indicatif, afin de comparer la retraite des différents régimes.\nOn se limite notamment aux hypothèses suivantes :\n  - On considère que le travailleur a pris sa retraite à taux plein, en cotisant le nombre de trimestres requis (172), ou en partant à l'âge taux plein (67 ans)\n  - On considère que le travailleur a eu le même revenu tout au long de sa carrière\n  - On considère que le travailleur est resté dans le même régime tout au long de sa carrière\n  - On ne prend pas en compte les minorations / majorations\n  - On ne prend pas en compte les caisses de retraite des professions libérales réglementées (les 10 sections de la Cnavpl et la Cnbf)\n  - On ne calcule pas le nombre de trimestres validés par année\n"
  },
  "protection sociale . retraite . plr": {
    "applicable si": "dirigeant . indépendant . PL . CNAVPL",
    "remplace": "retraite",
    "rend non applicable": "complémentaire indépendants",
    "titre": "Retraite profession libérale réglementée",
    "description": "Nous n'avons pas implémenté les règles spécifiques aux professions libérales réglementées.",
    "valeur": "'Non implémenté'"
  },
  "protection sociale . retraite . base": {
    "titre": "pension de retraite de base",
    "formule": {
      "produit": {
        "taux": "taux de la pension",
        "plafond": "plafond sécurité sociale temps plein",
        "assiette": "revenu moyen"
      }
    },
    "note": "Les impatriés bénéficient d'une exonération de cotisation vieillesse. En contrepartie, ils n'acquièrent aucun droit pendant la durée d'exonération.",
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F21552"
    }
  },
  "protection sociale . retraite . base . taux de la pension": {
    "description": "Le taux appliqué, avec décote ou surcote en fonction du nombre de trimestres cotisés.",
    "formule": {
      "variations": [
        {
          "si": "trimestres validés = 0",
          "alors": "0%"
        },
        {
          "sinon": "50%"
        }
      ]
    },
    "note": "On ne prends pas en compte la décote du taux suite aux trimestres manquant. On considère donc que le cotisant part à taux plein, donc à 67 ans (ou avant si tous les trimestres sont validés).",
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F19666"
    }
  },
  "protection sociale . retraite . trimestres validés": {
    "unité": "trimestres validés/an",
    "formule": {
      "somme": [
        "trimestres salarié",
        "trimestres indépendant",
        "trimestres auto-entrepreneur"
      ],
      "plafond": 4
    }
  },
  "protection sociale . retraite . trimestres validés . trimestres salarié": {
    "unité": "trimestres validés/an",
    "applicable si": "contrat salarié",
    "formule": "barème trimestres générique"
  },
  "protection sociale . retraite . trimestres validés . trimestres indépendant": {
    "unité": "trimestres validés/an",
    "applicable si": "dirigeant . indépendant",
    "formule": {
      "variations": [
        {
          "si": "situation personnelle . RSA",
          "alors": "barème trimestres générique"
        },
        {
          "sinon": {
            "valeur": "barème trimestres générique",
            "plancher": 3
          }
        }
      ]
    }
  },
  "protection sociale . retraite . trimestres validés . barème trimestres générique": {
    "unité": "trimestres validés/an",
    "formule": {
      "grille": {
        "unité": "trimestres validés/an",
        "assiette": "revenu moyen",
        "multiplicateur": "SMIC horaire",
        "tranches": [
          {
            "montant": 0,
            "plafond": "150 heures/an"
          },
          {
            "montant": 1,
            "plafond": "300 heures/an"
          },
          {
            "montant": 2,
            "plafond": "450 heures/an"
          },
          {
            "montant": 3,
            "plafond": "600 heures/an"
          },
          {
            "montant": 4
          }
        ]
      }
    },
    "références": {
      "cnav.fr": "https://www.legislation.cnav.fr/Pages/bareme.aspx?Nom=salaire_validant_un_trimestre_montant_bar",
      "Article R351-9 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028751530/2014-03-21"
    }
  },
  "protection sociale . retraite . trimestres validés . trimestres auto-entrepreneur": {
    "applicable si": "dirigeant . auto-entrepreneur",
    "description": "Les seuils de chiffre d'affaires minimum pour la validation des trimestres pour la retraite en auto-entrepreneur. En-dessous du montant minimum, vous n'aurez accès qu'à l'allocation de solidarité.",
    "unité": "trimestres validés/an",
    "somme": [
      {
        "grille": {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "tranches": [
            {
              "montant": 0,
              "plafond": "4137 €/an"
            },
            {
              "montant": 1,
              "plafond": "7286 €/an"
            },
            {
              "montant": 2,
              "plafond": "10426 €/an"
            },
            {
              "montant": 3,
              "plafond": "20740 €/an"
            },
            {
              "montant": 4
            }
          ]
        }
      },
      {
        "grille": {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "tranches": [
            {
              "montant": 0,
              "plafond": "2880 €/an"
            },
            {
              "montant": 1,
              "plafond": "5062 €/an"
            },
            {
              "montant": 2,
              "plafond": "7266 €/an"
            },
            {
              "montant": 3,
              "plafond": "9675 €/an"
            },
            {
              "montant": 4
            }
          ]
        }
      },
      {
        "grille": {
          "unité": "trimestres validés/an",
          "assiette": "entreprise . chiffre d'affaires . service BIC",
          "tranches": [
            {
              "montant": 0,
              "plafond": "2412 €/an"
            },
            {
              "montant": 1,
              "plafond": "4239 €/an"
            },
            {
              "montant": 2,
              "plafond": "6071 €/an"
            },
            {
              "montant": 3,
              "plafond": "12030 €/an"
            },
            {
              "montant": 4
            }
          ]
        }
      }
    ],
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23369"
    }
  },
  "protection sociale . revenu moyen": {
    "description": "Le revenu utilisé pour le calcul du montant des pensions de retraite et des indemnités journalières de sécurité sociale lors d'un arrêt de travail.",
    "notes": "Normalement, on prend le revenu moyen des 25 meilleures années pour la retraite et des 3 derniers mois pour les indémnités. Vu qu'on intègre pas la notions de temporalité avec notre simulateur, on simplifie en prenant le même.",
    "unité": "€/an",
    "formule": {
      "plancher": "0 €/mois",
      "le maximum de": [
        "dirigeant . indépendant . revenu professionnel",
        "dirigeant . auto-entrepreneur . impôt . revenu imposable",
        "contrat salarié . rémunération . brut"
      ]
    }
  },
  "protection sociale . retraite . mois cotisés": {
    "unité": "mois",
    "formule": "172 trimestres * 3 mois/trimestre",
    "notes": "On prend l'hypothèse d'une retraite à taux plein pour un travailleur né en 1973 ou après"
  },
  "protection sociale . retraite . complémentaire salarié": {
    "formule": "points acquis * valeur du point",
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F15396"
    }
  },
  "protection sociale . retraite . complémentaire salarié . valeur du point": {
    "formule": "1.2714 €/point/an",
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F15396",
      "agirc-arrco": "https://www.agirc-arrco.fr/ressources-documentaires/chiffres-cles/"
    }
  },
  "protection sociale . retraite . complémentaire salarié . points acquis": {
    "unité": "points/mois",
    "note": "On se base sur une valeur constante du point, hors cette dernière change d'année en année, cette valeure est donc une grossière approximation\n",
    "formule": "mois cotisés * contrat salarié . retraite complémentaire / 17.3982 €/point",
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F15396"
    }
  },
  "protection sociale . retraite . complémentaire indépendants": {
    "acronyme": "RCI",
    "non applicable si": {
      "toutes ces conditions": [
        "entreprise . activité = 'libérale'",
        "dirigeant . indépendant . PL . régime général = non"
      ]
    },
    "formule": "total points acquis  * valeur du point",
    "références": {
      "secu-independants.fr": "https://www.secu-independants.fr/retraite/calcul-retraite/retraite-complementaire/"
    }
  },
  "protection sociale . retraite . complémentaire indépendants . valeur du point": {
    "formule": "1.191 €/point/an",
    "références": {
      "secu-independants.fr": "https://www.secu-independants.fr/baremes/prestations-vieillesse-et-invalidite-deces"
    }
  },
  "protection sociale . retraite . complémentaire indépendants . total points acquis": {
    "formule": "points acquis * mois cotisés"
  },
  "protection sociale . retraite . complémentaire indépendants . points acquis": {
    "unité": "points/an",
    "valeur": "dirigeant . indépendant . cotisations et contributions . retraite complémentaire / prix d'achat du point"
  },
  "protection sociale . retraite . complémentaire indépendants . prix d'achat du point": {
    "formule": "17.765 €/point",
    "références": {
      "secu-independants.fr": "https://www.secu-independants.fr/baremes/baremes-2018/baremesprestations-maladie-maternite/?reg=ile-de-france-centre&ae=oui"
    }
  },
  "protection sociale . santé": {
    "icônes": "🏥",
    "type": "branche",
    "résumé": "Couvre la plupart des soins de santé de la vie quotidienne et 100 % des maladies graves comme les séjours à l'hôpital.",
    "description": "L’Assurance Maladie protège durablement la santé de chacun dans sa vie personnelle ou professionnelle.\n\nConcrètement, elle accompagne 60 millions d’assurés tout au long de leur vie, en prenant en charge leurs soins quels que soient leurs ressources, leur situation ou leur état de santé. Elle garantit ainsi un accès universel aux droits et elle permet l’accès aux soins.\n\nGrâce à elle, vous êtes couvert sur la plupart des soins de santé. En cas de maladie grave ou de longue durée, 100 % des soins sont remboursés.\n\n## L'assurance maladie en France en quelques chiffres\n  - **92 %** des dépenses de santé remboursées en moyenne par l'assurance maladie et la complémentaire\n  - **30 000 € / an / patient** : exemple de prise en charge complète pour une personne atteinte de mucoviscidose\n  - **1 468 € / mois** : indémnité versée par la sécurité sociale pour un congé maternité (salaire moyen)\n  - **82,4 ans** d’espérance de vie moyenne en france (dans le top 10 mondial 🏅)\n",
    "références": {
      "ameli.fr": "https://assurance-maladie.ameli.fr/sites/default/files/ra-2017_agir-ensemble-proteger-chacun.pdf",
      "OCDE": "https://read.oecd-ilibrary.org/social-issues-migration-health/health-at-a-glance-europe-2018_health_glance_eur-2018-en#page89"
    }
  },
  "protection sociale . invalidité et décès": {
    "icônes": "🦽",
    "type": "branche",
    "résumé": "Garantit le versement d'une pension en cas d'invalidité et un capital à vos proches en cas de décès.",
    "description": "Vous pouvez être reconnu invalide si votre capacité de travail et de gain est réduite d'au moins 2/3 à la suite d'un accident ou d'une maladie d'origine non professionnelle. Vous pouvez obtenir le versement d'une pension d'invalidité afin de compenser la perte de revenus.\n\nLe capital décès est une indemnité qui garantit le versement d'un capital aux ayants droit d'un travailleur décédé, sous certaines conditions. Son montant est forfaitaire.\n",
    "références": {
      "capital décès (amelie.fr)": "https://www.ameli.fr/assure/remboursements/pensions-allocations-rentes/deces-proche-capital-deces",
      "capital décès (salarié privé)": "https://www.service-public.fr/particuliers/vosdroits/F3005",
      "pension invalidité": "https://www.service-public.fr/particuliers/vosdroits/F672"
    }
  },
  "protection sociale . santé . indemnités journalières": {
    "description": "Les indemnités journalières vous sont versées par l'Assurance Maladie pour compenser votre revenu pendant un arrêt de travail. Elles sont calculées à partir de votre revenu brut et versées tous les 14 jours en moyenne.",
    "non applicable si": {
      "toutes ces conditions": [
        "entreprise . activité . libérale réglementée",
        "dirigeant . indépendant . PL . régime général = non"
      ]
    },
    "unité": "€/jour",
    "note": "Nous n'avons implémenté les indemnités des régimes particuliers des\nprofessions libérales réglementées. Pour une liste exaustive des\nindemnisation, consultez [ce\nsite](https://www.coover.fr/prevoyance/tns/arret-maladie-profession-liberale)\n",
    "formule": {
      "somme": [
        "indemnités journalières . auto-entrepreneur",
        "indemnités journalières . indépendant",
        "indemnités journalières . salarié"
      ]
    }
  },
  "protection sociale . santé . indemnités journalières . auto-entrepreneur": {
    "applicable si": "dirigeant . auto-entrepreneur",
    "unité": "€/jour",
    "formule": {
      "variations": [
        {
          "si": "revenu moyen < 3919.20 €/an",
          "alors": "0 €/jour"
        },
        {
          "sinon": {
            "produit": {
              "assiette": "revenu moyen",
              "taux": "50%"
            },
            "plafond": "55.51 €/jour"
          }
        }
      ]
    },
    "reférences": [
      {
        "secu-independants.fr": "https://www.secu-independants.fr/sante/indemnites-journalieres/montant-de-lindemnite"
      }
    ]
  },
  "protection sociale . santé . indemnités journalières . indépendant": {
    "applicable si": "dirigeant . indépendant",
    "unité": "€/jour",
    "formule": {
      "produit": {
        "assiette": "revenu moyen",
        "taux": "50%"
      },
      "plancher": "21 €/jour",
      "plafond": "55.51 €/jour"
    },
    "reférences": [
      {
        "secu-independants.fr": "https://www.secu-independants.fr/sante/indemnites-journalieres/montant-de-lindemnite"
      }
    ]
  },
  "protection sociale . santé . indemnités journalières . salarié": {
    "unité": "€/jour",
    "notes": "Vu que le simulateur ne permet pas encore la conversion de période vers le jour, on multiplie le salaire moyen par 3 pour avoir le salaire trimestriel, puis on le divise par 91.25, conformément à la fiche service-public.fr",
    "applicable si": "contrat salarié",
    "formule": {
      "produit": {
        "assiette": "revenu moyen",
        "taux": "50%",
        "plafond": "1.8 * SMIC temps plein"
      }
    },
    "reférences": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F3053"
    }
  },
  "protection sociale . assurance chômage": {
    "icônes": "💸",
    "type": "assurance",
    "résumé": "Assure un revenu aux travailleurs à la recherche d'un nouvel emploi.",
    "description": "Depuis 1958, l’Assurance chômage protège tous les salariés du privé et certains du secteur public lorsqu’ils perdent leur emploi. Elle leur verse une allocation et favorise leur retour à l’emploi grâce à des aides.\nFonctionnant comme une assurance,  elle indemnise ceux qui ont cotisé, en fonction de leur ancien salaire. Mais elle est aussi solidaire, puisqu’elle mutualise les risques et compense mieux la perte d’un bas salaire que d’un haut revenu.\nGrâce à elle, tous ceux qui perdent leur emploi de façon involontaire peuvent toucher un revenu sous forme d’allocation à condition d’avoir cotisé suffisamment.\n## L'assurance chômage en France en quelques chiffres\n  - **72 %** de l'ancien salaire net : pourcentage de l'allocation chômage en moyenne\n  - **2,7 millions** de chômeurs indemnisés chaque mois\n  - **1 020 €** : montant de l'allocation nette moyenne par mois\n  - **51 %** des allocataires cumulent allocation et salaire\n",
    "références": {
      "Pôle-emploi": "https://www.pole-emploi.fr/accueil",
      "Unédic": "https://www.unedic.org/a-propos/quest-ce-que-lassurance-chomage"
    }
  },
  "protection sociale . famille": {
    "icônes": "👶",
    "type": "branche",
    "résumé": "Assure des prestations en soutien aux familles : garde d'enfants, aide au logement...\n",
    "description": "Créée en 1945, la branche Famille est l’un des principaux acteurs de la politique familiale française. Actuellement, elle a deux missions prioritaires :\n  - Aider les familles dans leur vie quotidienne, faciliter, en particulier, la conciliation entre vie familiale et vie professionnelle\n  - Développer la solidarité envers les plus vulnérables, dont les personnes handicapées\n\nPour remplir ces missions, elle s’appuie sur deux leviers :\n  - Le versement de prestations financières aux familles (prestations familiales et sociales, aides au logement et minima sociaux comme l’aide aux adultes handicapés et le revenu de solidarité active)\n  - L’accompagnement des familles et la mise en place ou le cofinancement de différents\n  services et équipements collectifs qui leur sont destinés (comme les crèches)\n\n## Les allocations familiales en France en quelques chiffres\n  - **19 %** part des dépenses allouées à la petite enfance\n  - **860 € / mois** : montant de l'allocation aux adultes handicapés\n  - **75 %** des mères avec un enfant à charge travaillent (dont 70% à temps plein)\n",
    "références": {
      "CAF": "https://www.caf.fr/sites/default/files/plaquette branche famille francais.pdf",
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F12242"
    }
  },
  "protection sociale . accidents du travail et maladies professionnelles": {
    "icônes": "☣️",
    "résumé": "Offre une couverture complète des maladies ou accidents du travail.",
    "description": "L’assurance AT/MP (accident du travail et maladie professionnelle) est la plus ancienne branche de la Sécurité sociale : elle relève de principes qui remontent à l’année 1898 et qui ont été repris dans la loi du 31 décembre 1946.\n\n[🎞️ Voir la vidéo](https://www.youtube.com/watch?v=NaGI_deZJD8 )\n\nLa cotisation AT/MP couvre les risques accidents du travail, accidents de trajet et maladies professionnelles pour les salariés relevant du régime général.\n\nCette cotisation est obligatoire et à la charge exclusive de l’employeur.\n\nPour connaître les risques professionnels et mettre en place des actions de prévention, le [compte AT/MP](https://www.ameli.fr/paris/entreprise/cotisations/mp-tarification-calculs-baremes/compte-mp) est un service ouvert à toutes les entreprises du régime général de la Sécurité sociale.\n\nEn cas d’AT/MP, les soins médicaux et chirurgicaux sont remboursés intégralement dans la limite des tarifs de la Sécurité sociale.\n",
    "unité": "€/jour",
    "applicable si": "contrat salarié",
    "formule": {
      "produit": {
        "assiette": {
          "valeur": "revenu moyen",
          "plafond": "83.4% * plafond sécurité sociale temps plein"
        },
        "taux": {
          "nom": "Pourcentage du salaire journalier de référence",
          "valeur": "60%"
        }
      }
    },
    "note": "Le taux est de 80% à partir du 29e jour d'arrêt.\n",
    "références": {
      "ameli.fr": "https://www.ameli.fr/paris/entreprise/cotisations/mp-tarification-calculs-baremes/compte-mp",
      "service-public.fr (AT)": "https://www.service-public.fr/particuliers/vosdroits/F31881",
      "service-public.fr (MP)": "https://www.service-public.fr/particuliers/vosdroits/F31880",
      "Calcul de l'indemnité": "https://www.service-public.fr/particuliers/vosdroits/F32148",
      "Code de la Sécurité Sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006156659/2020-12-10/"
    }
  },
  "protection sociale . formation": {
    "icônes": "👩‍🎓",
    "résumé": "Finance la possibilité de suivre des formations professionnelles.",
    "description": "La formation professionnelle permet à chaque personne, indépendamment de son statut, d’acquérir et d’actualiser ses connaissances et ses compétences, d’accroître son niveau de qualification et de favoriser son évolution professionnelle.\n\nPour avoir un compte-rendu personnalisé de vos droits à la formation, rendez-vous sur [www.moncompteactivite.gouv.fr](https://www.moncompteactivite.gouv.fr).\n"
  },
  "protection sociale . autres": {
    "icônes": "🔧",
    "résumé": "Autres contributions au système social.",
    "description": "Toutes les contributions transverses au système social.\n\nOn y retrouve par exemple la CRDS (contribution pour le remboursement de la dette sociale) qui est un impôt destiné à résorber l'endettement de la Sécurité sociale, et ainsi assurer la viabilité de la protection sociale pour vos enfants et petits enfants.\n"
  },
  "protection sociale . transport": {
    "icônes": "🚌",
    "résumé": "Permet de maintenir le prix d'un billet de transport en commun à un bas prix",
    "description": "Cette contribution est reversée intégralement à l'[autorité organisatrice de la mobilité](https://fr.wikipedia.org/wiki/Autorit%C3%A9_organisatrice_de_la_mobilit%C3%A9) de la zone ou est implantée l'entreprise. Celle-ci peut ensuite l'utiliser pour subventionner les transports en commun existants ou pour développer de nouvelles infrastructures de transport (tramway, métro, bus...).\n\n## Le versement transport en quelques chiffres\n- **45% de réduction** sur le coût des transports en communs dans les 12 plus grandes agglomérations de France.\n- **263 € / an / habitant** de gain de pouvoir d'achat pour les habitants d'Île-de-France\n",
    "références": {
      "wikipedia": "https://fr.wikipedia.org/wiki/Versement_transport"
    }
  },
  "contrat salarié": {
    "icônes": "📄",
    "question": "De quel type de contrat s'agit-il ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "CDI",
          "CDD",
          "apprentissage",
          "professionnalisation",
          "stage"
        ]
      }
    },
    "par défaut": "'CDI'",
    "description": "Le contrat qui lie une entreprise (via son établissement) à un individu, qui est alors son salarié.\n\nLe contrat n'est en fait pas nécessaire dans le droit français, il est possible d'employer quelqu'un sans contrat par exemple dans les cas suivants:\n- Particuliers employeurs : Plus de 8 heures par semaine ou de plus de 4 semaines consécutives dans l'année.\n- CDI : La signature d’un contrat de travail n’est pas obligatoire dans certains cas. C’est le cas du Contrat de travail à Durée Indéterminée, considéré comme la forme normale et générale de la relation de travail entre un salarié et un employeur (Art. L1221-2 du Code du travail).\n"
  },
  "contrat salarié . CDI": {
    "formule": "contrat salarié = 'CDI'"
  },
  "contrat salarié . ancienneté": {
    "formule": {
      "durée": {
        "depuis": "date d'embauche"
      }
    }
  },
  "contrat salarié . ancienneté . date d'embauche": {
    "question": "Quelle est la date d'embauche du salarié ?",
    "par défaut": "01/10/2021",
    "suggestions": {
      "Début 2021": "01/01/2021",
      "Début 2020": "01/01/2020",
      "Fin 2017": "31/12/2017"
    },
    "type": "date"
  },
  "contrat salarié . salarié majeur": {
    "question": "Le salarié est-il majeur ?",
    "par défaut": "oui"
  },
  "contrat salarié . frais professionnels": {
    "titre": "remboursement de frais",
    "unité": "€/mois",
    "description": "Les frais professionnels correspondent à des dépenses engagées par le salarié pour les besoins de son activité professionnelle. Ces frais sont ensuite remboursés par l’employeur.\n\nLe dédommagement de ces frais peut prendre la forme :\n\n  - d’un remboursement des dépenses réelles sur justificatifs ;\n\n  - d’un versement d’allocations forfaitaires ;\n\n  - de l’application d’une déduction forfaitaire spécifique sur le salaire soumis à cotisations ; cette possibilité n’étant ouverte qu’à certaines professions.\n\n\nLes frais professionnels sont généralement exclus de la base de calcul des cotisations de sécurité sociale et de la CSG-CRDS, sauf en cas de dépassement de plafond pour les remboursements forfaitaires ( frais de panier, titres-restaurant, forfait mobilités durables...).",
    "formule": {
      "somme": [
        "titres-restaurant . montant . employeur",
        "abonnement transports publics . prise en charge",
        "transports personnels . montant"
      ]
    }
  },
  "contrat salarié . frais professionnels . part déductible": {
    "titre": "Frais professionnels déductibles",
    "description": "Part des frais déduite de l'assiette de cotisation sociale et pour le calcul de l'impôt sur le revenu.",
    "formule": {
      "somme": [
        "titres-restaurant . part déductible",
        "abonnement transports publics . prise en charge",
        "transports personnels . part déductible"
      ]
    }
  },
  "contrat salarié . frais professionnels . titres-restaurant": {
    "icônes": "🍽️",
    "description": "Le titre-restaurant est un titre spécial de paiement « des repas » remis par l’employeur au salarié.\n\nLe salarié ne peut utiliser les titres-restaurant en sa possession que pour régler la consommation :\n\n  - d’un repas,\n\n  - de préparations alimentaires directement consommables,\n\n  - de fruits et légumes.\n\nCe titre peut être émis sur support papier ou sous forme dématérialisée.",
    "question": "Le salarié reçoit-il des titres-restaurant ?",
    "par défaut": "non"
  },
  "contrat salarié . frais professionnels . titres-restaurant . montant": {
    "titre": "Titres-restaurant",
    "formule": {
      "produit": {
        "assiette": "montant unitaire",
        "facteur": "nombre",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "taux": "taux participation employeur"
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "taux": "100% - taux participation employeur"
          }
        ]
      }
    }
  },
  "contrat salarié . frais professionnels . titres-restaurant . part déductible": {
    "titre": "Titres-restaurant (déductible)",
    "formule": {
      "valeur": "montant . employeur",
      "plafond": {
        "produit": {
          "assiette": "nombre",
          "facteur": {
            "nom": "max",
            "valeur": {
              "variations": [
                {
                  "si": "année = 2022",
                  "alors": "5.69 €/titres-restaurant"
                },
                {
                  "si": "année = 2021",
                  "alors": "5.55 €/titres-restaurant"
                }
              ]
            }
          }
        }
      }
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/taux-et-baremes/frais-professionnels/les-titres-restaurant.html"
    }
  },
  "contrat salarié . frais professionnels . titres-restaurant . nombre": {
    "question": "Combien de titres-restaurant sont distribués au salarié ?",
    "arrondi": "oui",
    "par défaut": {
      "produit": {
        "assiette": "19 titres-restaurant/mois",
        "facteur": "temps de travail . quotité de travail"
      }
    },
    "suggestions": {
      "5 repas/semaines": "5 titres-restaurant/semaines * période . semaines par mois",
      "3 repas/semaine": "3 titres-restaurant/semaines * période . semaines par mois"
    }
  },
  "contrat salarié . frais professionnels . titres-restaurant . montant unitaire": {
    "question": "Quelle est la valeur unitaire du titre-restaurant ?",
    "description": "Il n'y a pas de valeur maximale ou minimale pour les titres-restaurant. En revanche, pour bénéficier de l'exonération de cotisation, il ne faut pas dépasser 11,38€ par titre en 2021.",
    "par défaut": "8 €/titre-restaurant",
    "suggestions": {
      "faible": "6 €/titre-restaurant",
      "moyenne": "8 €/titre-restaurant",
      "max exonéré": {
        "valeur": "part déductible . max / taux participation employeur",
        "unité": "€ / titre-restaurant"
      }
    }
  },
  "contrat salarié . frais professionnels . titres-restaurant . taux participation employeur": {
    "description": "Part du titre-restaurant payée par l'employeur. Doit être de 50% minimum et de 60% maximum.",
    "question": "Quelle est la participation de l'employeur ?",
    "par défaut": "50 %",
    "suggestions": {
      "50%": "50 %",
      "60%": "60 %"
    }
  },
  "contrat salarié . frais professionnels . titres-restaurant . contrôle taux employeur min": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "taux participation employeur < 50%",
    "description": "La part employeur du titre-restaurant doit être de 50% au minimum"
  },
  "contrat salarié . frais professionnels . titres-restaurant . contrôle taux employeur max": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "taux participation employeur > 60%",
    "description": "La part employeur du titre-restaurant doit être de 60% au maximum"
  },
  "contrat salarié . frais professionnels . abonnement transports publics": {
    "icônes": "🚍",
    "valeur": "oui"
  },
  "contrat salarié . frais professionnels . abonnement transports publics . montant": {
    "titre": "Abonnement aux transports publics",
    "question": "Quel montant le salarié dépense-t-il en abonnement aux transports publics chaque mois ?",
    "unité": "€/mois",
    "par défaut": "0 €/mois",
    "description": "L'employeur doit prendre en charge 50% du montant dépensé par le salarié pour les transports publics lui permettant de se rendre sur son lieu de travail.\n\nCette prise en charge (dans la limite des 50% du montant) est exonérée de cotisations sociales et d'impôt sur le revenu.\n\nDans le cas d'un temps partiel, le taux de prise en charge sera le même pour un mi-temps ou plus. En dessous, le taux de prise en charge sera proportionnel.\n",
    "références": {
      "Articles R3261-1 à -10 du code du travail, version 01/01/2009": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020080272/2009-01-01",
      "Article 81 du code des impôts, version en vigueur au 31/12/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042910732/2020-12-31/"
    },
    "suggestions": {
      "Navigo": "75 €/mois",
      "Técély": "65 €/mois",
      "RTM": "40 €/mois",
      "Tisséo": "42.50 €/mois",
      "TBM": "42.20 €/mois"
    }
  },
  "contrat salarié . frais professionnels . abonnement transports publics . taux de participation employeur": {
    "valeur": "50%"
  },
  "contrat salarié . frais professionnels . abonnement transports publics . taux de prise en charge": {
    "titre": "Taux de prise en charge",
    "valeur": {
      "produit": {
        "assiette": {
          "le minimum de": [
            "temps de travail . quotité de travail",
            "50%"
          ]
        },
        "taux": "2 * taux de participation employeur"
      }
    }
  },
  "contrat salarié . frais professionnels . abonnement transports publics . prise en charge": {
    "titre": "Abonnement transports publics, part prise en charge par l'employeur (déductible)",
    "unité": "€/mois",
    "valeur": "taux de prise en charge * montant"
  },
  "contrat salarié . frais professionnels . transports personnels": {
    "valeur": "oui",
    "non applicable si": "déduction forfaitaire spécifique",
    "références": {
      "circ. DGT-DSS 2009-1 du 28 janvier 2009": "https://www.legifrance.gouv.fr/download/file/pdf/cir_2423/CIRC"
    }
  },
  "contrat salarié . frais professionnels . transports personnels . montant": {
    "titre": "Transports personnels",
    "valeur": {
      "somme": [
        "carburant faible émission . montant",
        "forfait mobilités durables . montant"
      ]
    }
  },
  "contrat salarié . frais professionnels . transports personnels . part déductible": {
    "valeur": {
      "somme": [
        "carburant faible émission . part déductible",
        "forfait mobilités durables . part déductible"
      ]
    }
  },
  "contrat salarié . frais professionnels . transports personnels . proportion déduction": {
    "titre": "Facteur de proportion de la déductibilité",
    "valeur": {
      "produit": {
        "assiette": {
          "le minimum de": [
            "temps de travail . quotité de travail",
            "50%"
          ]
        },
        "taux": "200%"
      }
    },
    "références": {
      "Article R3261-14 du code du travail, version 11/05/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000041865023/2020-05-11/"
    }
  },
  "contrat salarié . frais professionnels . transports personnels . carburant faible émission": {
    "valeur": "oui"
  },
  "contrat salarié . frais professionnels . transports personnels . carburant faible émission . montant": {
    "titre": "Prise en charge du carburant pour véhicule électrique, hybride rechargeable ou hydrogène",
    "question": "Quel montant l'employeur prend-il en charge des dépenses en carburant pour véhicule électrique, hybride rechargeable ou hydrogènes?",
    "unité": "€/an",
    "par défaut": "0 €/an",
    "description": "L'employeur peut prendre en charge tout ou partie des frais de carburant dépensés par l'employé pour son véhicule électriques, hybrides rechargeables ou hydrogènes, sur présentation de justificatif.\n\nCette prise en charge peut profiter d'une exonération des cotisations sociales et de l'impôt sur le revenu. Le montant maximal déductible est de 200€/an, mais attention\n\n  - le plafond est partiellement réduit du montant de la prise en charge des frais d'abonnement aux transports publics\n\n  - cette prise en charge de carburant entre dans la même assiette que la prise en charge du forfait mobilités durables.\n\nDans le cas d'un temps partiel, l'avantage sera le même pour un mi-temps ou plus. En dessous, un facteur proportionnel sera appliqué.\n\nPour verser une prime de salaire équivalente à 200€/an à son salarié sans ce dispositif, **l'employeur devrait débourser près de 500€ pour un salaire médian**.\n",
    "références": {
      "Articles R3261-11 à -13 du code du travail, version 11/05/2020": "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018487476/2020-05-11",
      "Article 81 du code des impôts, version en vigueur au 31/12/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042910732/2020-12-31/"
    }
  },
  "contrat salarié . frais professionnels . transports personnels . carburant faible émission . part déductible": {
    "titre": "Prise en charge du carburant pour véhicule électrique, hybride rechargeable ou hydrogène (part déductible)",
    "unité": "€/an",
    "valeur": "montant",
    "plafond": {
      "le minimum de": [
        "proportion déduction * 200€/an",
        {
          "valeur": "proportion déduction * 500€/an",
          "abattement": "abonnement transports publics . prise en charge"
        }
      ]
    }
  },
  "contrat salarié . frais professionnels . transports personnels . forfait mobilités durables": {
    "valeur": "oui"
  },
  "contrat salarié . frais professionnels . transports personnels . forfait mobilités durables . montant": {
    "titre": "Prise en charge des frais de transports forfait mobilités durables",
    "question": "Quel montant l'employeur prend-il en charge dans le cadre du forfait mobilités durables ?",
    "unité": "€/an",
    "par défaut": "0 €/an",
    "description": "L'employeur peut prendre en charge tout ou partie des frais de déplacement liés à l'utilisation des véhicules entrant dans le cadre du forfait mobilités durables\n\n  - le vélo et vélo à assistance électrique\n\n  - le covoiturage (conducteur ou passager)\n\n  - les engins de déplacement personnels en location ou en libre-service\n\n  - l'autopartage avec des véhicules électriques, hybrides rechargeables ou hydrogènes\n\n  - les transports en commun (hors abonnement).\n\nL'ancienne Indemnité Kilométrique Vélo entre maintenant dans ce dispositif. Elle peut être poursuivie mais son montant devra être imputé ici.\n\nL'employeur peut prendre en charge ces frais jusqu'à 500€/an de manière exonérée de cotisations sociales et d'impôt. Attention cependant\n\n  - le plafond est réduit du montant de la prise en charge des frais d'abonnement aux transports publics\n\n  - la prise en charge du carburant faible émission entre dans cette assiette également.\n\nDans le cas d'un temps partiel, l'avantage sera le même pour un mi-temps ou plus. En dessous, un facteur proportionnel sera appliqué.\n\nPour verser une prime de salaire équivalente à 500€/an à son salarié sans ce dispositif, **l'employeur devrait débourser près de 800€ pour un salaire médian**.\n",
    "références": {
      "Articles R3261-13-1 à -13-2 du code du travail, version 11/05/2020": "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018487476/2020-05-11",
      "Article 81 du code des impôts, version en vigueur au 31/12/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042910732/2020-12-31/"
    }
  },
  "contrat salarié . frais professionnels . transports personnels . forfait mobilités durables . part déductible": {
    "titre": "Prise en charge des frais de transports forfait mobilités durables (part déductible)",
    "unité": "€/an",
    "valeur": "montant",
    "plafond": {
      "valeur": "proportion déduction * 500€/an",
      "abattement": {
        "somme": [
          "abonnement transports publics . prise en charge",
          "carburant faible émission . part déductible"
        ]
      }
    }
  },
  "contrat salarié . activité partielle": {
    "question": "Le salarié est-il en chômage partiel ?",
    "description": "À la suite de la crise du Coronavirus, le gouvernement a mis en place un dispositif de chômage partiel étendu dans lequel l'État prend en charge l'indemnisation des heures chômées jusqu’à 4,5 SMIC.\nLa déclaration d'activité partielle est simplifiée et l'effet est rétroactif.",
    "par défaut": "non",
    "rend non applicable": [
      "temps de travail . heures supplémentaires",
      "temps de travail . heures complémentaires"
    ],
    "références": {
      "déclaration employeur": "https://activitepartielle.emploi.gouv.fr/aparts/",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23503",
      "economie.gouv.fr": "https://www.economie.gouv.fr/entreprises/activite-partielle",
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/reduire-ou-cesser-lactivite/lactivite-partielle.html"
    }
  },
  "contrat salarié . activité partielle . rémunération mensuelle minimale": {
    "acronyme": "RMM",
    "description": "Les salariés à temps plein dont l’horaire de travail est réduit ont droit à une rémunération mensuelle minimale qui peut donner lieu à un versement complémentaire de l’employeur.",
    "références": {
      "Article L3232-3 du code du travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006902847&cidTexte=LEGITEXT000006072050&dateTexte=20080501"
    },
    "formule": {
      "recalcul": {
        "règle": "contrat salarié . rémunération . net de cotisations",
        "avec": {
          "rémunération . brut de base": "SMIC contractuel",
          "activité partielle": "non",
          "temps de travail . heures supplémentaires": "non",
          "temps de travail . heures complémentaires": "non"
        }
      }
    }
  },
  "contrat salarié . activité partielle . heures chômées": {
    "unité": "heures/mois",
    "formule": {
      "valeur": "temps de travail . temps contractuel - heures travaillées",
      "plancher": 0
    }
  },
  "contrat salarié . activité partielle . heures travaillées": {
    "titre": "heures travaillées restantes",
    "question": "Quelle est le nombre d'heures travaillées sur le mois ?",
    "description": "Dans le cadre du chômage partiel, le nombre d'heure restantes travaillées. Doit être inférieur au temps contractuel.",
    "par défaut": "0 heures/mois",
    "suggestions": {
      "30 h/semaine": "130 heures/mois",
      "20 h/semaine": "86.6666 heures/mois",
      "10 h/semaine": "43.3333 heures/mois"
    }
  },
  "contrat salarié . activité partielle . heures travaillées . contrôle temps de travail": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "heures travaillées > temps de travail . temps contractuel",
    "description": "Dans le cadre de l'activité partielle, le temps de travail doit être inférieur à celui inscrit dans le contrat de travail."
  },
  "contrat salarié . activité partielle . indemnités": {
    "titre": "indemnités activité partielle",
    "description": "La mise en chômage partiel ouvre droit non au paiement d’un salaire mais à l’allocation spécifique. Pour chaque heure chômée indemnisable, le salarié reçoit de l'entreprise une indemnité. L'entreprise obtient en contrepartie de l’Etat une allocation d’activité partielle.\nSi après versement de l’indemnité d’activité partielle la rémunération du salarié est inférieure à la rémunération mensuelle minimale (RMM garantie par les articles L3232-1 et suivants du code du travail pour les salariés à temps plein), l'employeur doit  lui verser une allocation complémentaire qui est égale à la différence entre la rémunération mensuelle minimale (ou Smic net) et la somme initialement perçue par le salarié.",
    "formule": {
      "somme": [
        "base",
        "complémentaire",
        "conventionnelle"
      ]
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/reduire-ou-cesser-lactivite/lactivite-partielle.html"
    }
  },
  "contrat salarié . activité partielle . indemnités . base": {
    "titre": "indemnités d'activité partielle de base",
    "formule": {
      "multiplication": {
        "assiette": "retrait absence",
        "taux": {
          "valeur": {
            "variations": [
              {
                "si": "secteur d'activité restreint",
                "alors": "70%"
              },
              {
                "sinon": "60%"
              }
            ]
          },
          "nom": "taux"
        }
      }
    }
  },
  "contrat salarié . activité partielle . indemnités . complémentaire": {
    "titre": "indemnité complémentaire",
    "description": "L'indemnité complémentaire de chômage partielle est une indemnité versée par l'entreprise pour les salaires proches du SMIC permettant de s'assurer que rémunération effectivement perçue ne soit jamais inférieure à celle du SMIC net.",
    "non applicable si": "rémunération . brut de base > 3.15 * SMIC",
    "formule": {
      "valeur": "rémunération mensuelle minimale",
      "abattement": {
        "somme": [
          "rémunération . net de cotisations",
          "indemnités . base",
          "indemnités . conventionnelle"
        ]
      }
    }
  },
  "contrat salarié . activité partielle . indemnités . conventionnelle": {
    "applicable si": "convention syntec",
    "formule": {
      "produit": {
        "assiette": "retrait absence",
        "taux": {
          "grille": {
            "assiette": "rémunération . assiette congés payés",
            "tranches": [
              {
                "montant": "95% - indemnités . base . taux",
                "plafond": "2000 €/mois"
              },
              {
                "montant": "80% - indemnités . base . taux",
                "plafond": "plafond sécurité sociale temps plein"
              },
              {
                "montant": "75% - indemnités . base . taux"
              }
            ]
          }
        }
      }
    },
    "références": {
      "Legifrance": "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000028465400&cidTexte=KALITEXT000028465378&dateTexte=29990101&categorieLien=id",
      "Juritravail": "https://www.juritravail.com/Actualite/Hygiene-securite-travail-employeur/Id/327284"
    }
  },
  "contrat salarié . activité partielle . indemnités . conventionnelle . part soumise à cotisation": {
    "applicable si": {
      "toutes ces conditions": [
        "indemnités . conventionnelle > 0",
        "indemnités . conventionnelle + indemnités . base > 3.15 * SMIC"
      ]
    },
    "remplace": "contrat salarié . cotisations . assiette",
    "rend non applicable": "réduction générale",
    "formule": {
      "somme": [
        "contrat salarié . cotisations . assiette",
        {
          "valeur": "activité partielle . indemnités - 3.15 * SMIC",
          "plafond": "activité partielle . indemnités . conventionnelle"
        }
      ]
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/activite-partielle--nouveau-disp.html",
      "Ordonnance du 22 avril 2020, article 5": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000041814597/#JORFARTI000041814602"
    }
  },
  "contrat salarié . activité partielle . retrait absence": {
    "titre": "retrait activité partielle",
    "formule": {
      "multiplication": {
        "assiette": "rémunération . taux horaire",
        "facteur": "heures chômées"
      }
    }
  },
  "contrat salarié . activité partielle . indemnisation entreprise": {
    "titre": "Remboursement de l'indemnité d'activité partielle",
    "description": "Dans le cadre de la crise du Coronavirus, le gouvernement a annoncé que l'indemnité de chômage partiel pour les commerces fermés sera prise à 100% en charge par l'état.",
    "formule": {
      "multiplication": {
        "assiette": "retrait absence",
        "taux": "taux d'indemnisation"
      },
      "plancher": {
        "variations": [
          {
            "si": "année = 2022",
            "alors": "8.37 €/heure * heures chômées"
          },
          {
            "si": "année = 2021",
            "alors": "8.30 €/heure * heures chômées"
          }
        ]
      },
      "plafond": {
        "recalcul": {
          "avec": {
            "rémunération . brut de base": "4.5 * SMIC"
          }
        }
      }
    },
    "références": {
      "Décret mise à jour 2022": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044614377"
    }
  },
  "contrat salarié . activité partielle . indemnisation entreprise . taux d'indemnisation": {
    "titre": "taux d'allocation",
    "description": "Pendant la période de baisse d’activité, l’employeur reçoit de l’Agence de services et de paiement (ASP) une allocation équivalente à une part de la rémunération horaire du salarié placé en activité partielle, dans un délai moyen de 12 jours. Le salarié reçoit quant à lui, de son employeur, une indemnité d’activité partielle, en lieu et place de son salaire pour la période durant laquelle il est placé en activité partielle.",
    "formule": {
      "variations": [
        {
          "si": "secteur d'activité restreint",
          "alors": "70%"
        },
        {
          "sinon": "36%"
        }
      ]
    }
  },
  "contrat salarié . activité partielle . secteur d'activité restreint": {
    "question": "Le secteur d'activité de l'entreprise fait-il l'objet de restrictions réglementaires ? (ex. : tourisme, restauration, culture, événementiel)",
    "description": "Les entreprises dont l'activité a été interrompue par décision administrative en raison de la crise sanitaire, ou qui sont situées dans une circonscription territoriale soumise à des restrictions spécifiques des conditions d'exercice de l'activité économique et de circulation des personnes prises par l'autorité administrative lorsqu'ils subissent une forte baisse de chiffre d'affaires, ou qui relèvent des secteurs les plus affectés et qui continuent de subir une très forte baisse du chiffre d'affaires, bénéficient d'un taux d'allocation de 70 % jusqu'au 31 octobre 2021.\n\nSont concernées :\n\n  - les entreprises relevant des secteurs, listés en annexe 2 du décret du 29 juin 2020 , qui ont subi une très forte baisse de chiffre d'affaires d'au moins 80 % durant la période comprise entre le 15 mars et le 15 mai 2020 ;\n\n  - les établissement recevant du public fermés administrativement ou situés dans un territoire soumis à des restrictions particulières (couvre-feu par exemple) et subissant une baisse de chiffre d'affaires d'au moins 60 % ;\n\n  - les établissements situés dans une zone de chalandise d'une station de ski et subissant une baisse de chiffre d'affaires d'au moins 50 % si les téléphériques et remontées mécaniques sont fermés.",
    "références": {
      "Liste des secteurs concernés": "https://travail-emploi.gouv.fr/actualites/presse/communiques-de-presse/article/prise-en-charge-a-100-de-l-activite-partielle-par-l-etat-pour-les-entreprises",
      "Actualité service-public.fr": "https://www.service-public.fr/particuliers/actualites/A15140"
    },
    "par défaut": "non"
  },
  "contrat salarié . activité partielle . convention syntec": {
    "question": "La convention collective Syntec est-elle applicable à l'entreprise ?",
    "description": "Convention Collective applicable aux salariés des Bureaux d'Études Techniques, des Cabinets d'Ingénieurs-Conseils et des Sociétés de Conseils.\nCette convention collective prévoit notamment une majoration de l'indemnité de chômage partielle au dessus du minimum légal et à la charge de l'entreprise.",
    "par défaut": "non"
  },
  "contrat salarié . déduction forfaitaire spécifique": {
    "description": "Pour une liste précise de professions, l'employeur peut pratiquer une déduction forfaitaire spécifique (DFS) pour frais professionnels sur la base de calcul des cotisations sociales. spécifique consiste en un abattement sur l'assiette des cotisations sociales. Elle peut s'appliquer si le salarié supporte effectivement des frais lors de son activité professionnelle.\nEn l’absence de frais effectivement engagés, ou si l’employeur prend en charge ou rembourse la totalité des frais professionnels, il est impossible d’appliquer la DFS.",
    "titre": "assiette avec DFS",
    "question": "Le salarié bénéficie-t-il d'une déduction forfaitaire spécifique ?",
    "par défaut": "non",
    "remplace": {
      "règle": "cotisations . assiette",
      "par": {
        "valeur": "cotisations . assiette",
        "abattement": {
          "valeur": "taux * cotisations . assiette",
          "plafond": "7600 €/an"
        },
        "plancher": "cotisations . assiette minimale"
      },
      "sauf dans": "contrat salarié . CSG et CRDS"
    },
    "références": {
      "Fiche Urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-frais-professionnels/la-deduction-forfaitaire-specifi.html"
    }
  },
  "contrat salarié . déduction forfaitaire spécifique . taux": {
    "formule": {
      "variations": [
        {
          "si": "profession = 'journaliste'",
          "alors": "20%"
        },
        {
          "si": "profession = 'ouvrier du bâtiment'",
          "alors": "10%"
        },
        {
          "si": "profession = 'artiste musicien'",
          "alors": "20%"
        },
        {
          "si": "profession = 'pilote de ligne ou personnel navigant'",
          "alors": "30%"
        },
        {
          "sinon": "0%"
        }
      ]
    },
    "références": {
      "Circulaire DSS": "https://solidarites-sante.gouv.fr/fichiers/bo/2005/05-09/a0090046.htm"
    }
  },
  "contrat salarié . déduction forfaitaire spécifique . profession": {
    "question": "Quelle est la profession du salarié pour l'application de la déduction forfaitaire spécifique ?",
    "par défaut": "non",
    "formule": {
      "une possibilité": {
        "possibilités": [
          "journaliste",
          "ouvrier du bâtiment",
          "artiste musicien",
          "pilote de ligne ou personnel navigant"
        ],
        "choix obligatoire": "oui"
      }
    }
  },
  "contrat salarié . déduction forfaitaire spécifique . profession . journaliste": {
    "formule": "contrat salarié . déduction forfaitaire spécifique . profession = 'journaliste'",
    "icônes": "✒",
    "description": "Concerne les journalistes, rédacteurs, photographes, directeurs de journaux Critiques dramatiques et musicaux."
  },
  "contrat salarié . déduction forfaitaire spécifique . profession . journaliste . réduction de taux": {
    "applicable si": "déduction forfaitaire spécifique . profession = 'journaliste'",
    "remplace": [
      {
        "règle": "vieillesse . employeur . plafonnée . taux",
        "par": "vieillesse . employeur . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "vieillesse . employeur . déplafonnée . taux",
        "par": "vieillesse . employeur . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "vieillesse . salarié . plafonnée . taux",
        "par": "vieillesse . salarié . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "vieillesse . salarié . déplafonnée . taux",
        "par": "vieillesse . salarié . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "allocations familiales . taux",
        "par": "allocations familiales . taux * réduction de taux"
      },
      {
        "règle": "établissement . taux du versement transport",
        "par": "établissement . taux du versement transport * réduction de taux"
      },
      {
        "règle": "ATMP . taux",
        "par": "ATMP . taux * réduction de taux"
      },
      {
        "règle": "ATMP . taux minimum",
        "par": "ATMP . taux minimum * réduction de taux"
      }
    ],
    "formule": "80%"
  },
  "contrat salarié . déduction forfaitaire spécifique . profession . journaliste . abattement fiscal": {
    "applicable si": "déduction forfaitaire spécifique . profession = 'journaliste'",
    "remplace": "rémunération . net imposable",
    "titre": "net imposable journaliste",
    "formule": {
      "valeur": "rémunération . net imposable",
      "abattement": "7650€/an"
    }
  },
  "contrat salarié . déduction forfaitaire spécifique . profession . ouvrier du bâtiment": {
    "icônes": "👷‍♂️",
    "description": "Concerne les ouvriers du bâtiment visés aux paragraphes 1er et 2 de l’article 1er du décret du 17 novembre 1936, à l’exclusion de ceux qui travaillent en usine ou en atelier."
  },
  "contrat salarié . déduction forfaitaire spécifique . profession . artiste musicien": {
    "icônes": "🎼",
    "description": "Concerne les artistes musiciens, choristes, chefs d’orchestre, régisseurs de théâtre"
  },
  "contrat salarié . déduction forfaitaire spécifique . profession . pilote de ligne ou personnel navigant": {
    "icônes": "✈",
    "description": "Concerne les pilotes, radios, mécaniciens navigants des compagnies de transports aériens ; pilotes et mécaniciens employés par les maisons de construction d’avions et de moteurs pour l’essai de prototypes ; pilotes moniteurs d’aéro-clubs et des écoles d’aviation civile"
  },
  "contrat salarié . CDD . CPF": {
    "description": "Contribution au financement du compte personnel de formation (CPF) spécifique aux CDD.",
    "cotisation": {
      "destinataire": "OPCA",
      "dû par": "employeur",
      "branche": "formation"
    },
    "non applicable si": {
      "une de ces conditions": [
        "événement . poursuite du CDD en CDI",
        "apprentissage",
        "contrat jeune vacances",
        "motif = 'classique . saisonnier'",
        "motif . contrat aidé"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "1%"
      }
    },
    "références": {
      "Code du travail - Article L6322-37": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000022234996&cidTexte=LEGITEXT000006072050"
    }
  },
  "contrat salarié . CDD . congés pris": {
    "question": "Combien de jours de congés seront pris sur la durée du CDD (en jours ouvrés) ?",
    "description": "Le contrat étant à durée déterminée, le salarié n'a pas forcément le temps de prendre tous les jours de congés qu'il a acquis comme tout salarié au cours du contrat.\nPar exemple, pour un contrat de 3 mois, le salarié acquiert 2,08 jours de congés par mois (25 jours / 12 mois = 2,08), donc 6,25 sur la durée du contrat. Or il se peut que l'entreprise le contraigne à n'en prendre que 4, donc 2,25 jours ne seront pas pris. Ils seront payés par l'employeur à la fin du contrat.\n",
    "unité": "jours ouvrés",
    "suggestions": {
      "la totalité": "congés dus sur la durée du contrat",
      "la moitié": "50% * congés dus sur la durée du contrat",
      "aucun": "0 jours ouvrés"
    },
    "par défaut": "congés dus sur la durée du contrat"
  },
  "contrat salarié . CDD . jours ouvrés sur la durée du contrat": {
    "produit": {
      "assiette": "253 jours ouvrés/an",
      "facteur": "durée contrat"
    }
  },
  "contrat salarié . CDD . congés dus sur la durée du contrat": {
    "produit": {
      "assiette": "25 jours ouvrés/an",
      "facteur": "durée contrat"
    },
    "arrondi": "2 décimales"
  },
  "contrat salarié . CDD . contrôle congés non pris max": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "congés pris > congés dus sur la durée du contrat",
    "description": "Le nombre de jours de congés pris est supérieur à la totalité des jours de congés acquis sur la durée du contrat (par défaut 25 jours / an)"
  },
  "contrat salarié . CDD . indemnité compensatrice de congés payés": {
    "titre": "indemnité de congés payés",
    "indemnité": {
      "destinataire": "salarié",
      "dû par": "employeur"
    },
    "description": "Le salarié en CDD bénéficie des mêmes droits à congés payés que le salarié\nen CDI. Il acquiert et prend ses congés payés dans les mêmes conditions.\n\nIl est cependant courant que le salarié ne puisse pas prendre tous ses\ncongés avant le terme de son contrat, il bénéficie alors d'une indemnité\ncompensatrice de congés payés versée par l'employeur.\n\nIl existe deux méthodes pour calculer l'indemnité de congés non pris.\n\n### Méthode \"du dixième\"\n\nCe mode de calcul sera le plus souvent favorable au salarié lorsque celui-ci\na accompli des heures supplémentaires. Une indemnité égale au dixième de la\nrémunération brute totale perçue par le salarié au cours de la période de\nréférence.\n\n### Méthode \"maintien du salaire\"\n\nCette méthode sera le plus souvent favorable au salarié lorsque celui-ci a\nbénéficié d’une augmentation de salaire.\n\nPour effectuer le calcul, l'employeur peut tenir compte soit :\n- de l'horaire réel du mois,\n- du nombre moyen de jours ouvrés (ou ouvrables),\n- du nombre réel de jours ouvrés (ou ouvrables).\n",
    "unité": "€/mois",
    "non applicable si": "événement . poursuite du CDD en CDI",
    "le maximum de": [
      {
        "nom": "Méthode du dixième",
        "produit": {
          "assiette": "rémunération . assiette congés payés",
          "taux": "10%"
        },
        "abattement": {
          "nom": "proportion congés pris",
          "unité": "%",
          "valeur": "congés pris / congés dus sur la durée du contrat",
          "plafond": "100%"
        }
      },
      {
        "nom": "Méthode du maintien de salaire",
        "produit": {
          "assiette": "rémunération . assiette congés payés / jours ouvrés sur la durée du contrat",
          "facteur": {
            "nom": "congés non pris",
            "valeur": "congés dus sur la durée du contrat - congés pris"
          }
        }
      }
    ],
    "note": "L'indemnité est versée à la fin du contrat, sauf si le CDD se poursuit par un CDI.\nÀ noter, la loi El Khomri modifie l'article L3141-12:\n- avant : Les congés peuvent être pris dès l'ouverture des droits\n- maintenant : Les congés peuvent être pris dès l’embauche\n",
    "références": {
      "Fiche service-public.gouv.fr": "https://www.service-public.fr/particuliers/vosdroits/F2931",
      "Code du travail - Article L3141-24": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006902661&dateTexte=&categorieLien=cid",
      "Congés payés et contrat CDD": "https://www.easycdd.com/LEGISLATION-CDD/L-embauche-le-suivi-du-contrat-CDD-les-incidents-frequents/Conges-payes-et-contrat-CDD",
      "assiette de l'indemnité, circulaire DRT 18 du 30 octobre 1990": "http://conseillerdusalarie.free.fr/Docs/TextesFrance/19901030Circulaire_DRT_90_18_du_30_octobre_1990_CDD_Travail_temporaire.htm",
      "Méthode du maintien de salaire": "https://www.service-public.fr/particuliers/vosdroits/F33359"
    }
  },
  "contrat salarié . CDD . prime de fin de contrat": {
    "indemnité": {
      "destinataire": "salarié"
    },
    "alias": "prime de précarité",
    "description": "Somme versée en fin de CDD comme compensation de précarité.",
    "note": "Attention : les exceptions sont légion. Conventions collectives...\n\n- Dans les faits, les CDD Senior perçoivent une indemnité d’un montant équivalent à l’indemnité de précarité : [line](https://www.easycdd.com/LEGISLATION-CDD/Fin-ou-rupture-du-contrat-CDD/La-prime-de-precarite/La-prime-de-precarite-n-est-pas-due-si)\n",
    "non applicable si": {
      "une de ces conditions": [
        "événement . poursuite du CDD en CDI",
        "événement . refus CDI avantageux",
        "événement . rupture anticipée salarié",
        "événement . rupture pour faute grave ou force majeure",
        "événement . rupture pendant période essai",
        "motif = 'classique . usage'",
        "motif = 'classique . saisonnier'",
        "motif . complément formation",
        "motif . contrat aidé",
        "contrat jeune vacances"
      ]
    },
    "formule": {
      "produit": {
        "assiette": {
          "somme": [
            "rémunération . brut de base",
            "rémunération . avantages en nature . montant",
            "rémunération . primes",
            "rémunération . heures supplémentaires"
          ]
        },
        "taux": "10%"
      }
    },
    "références": {
      "Code du travail - Article L1243-8": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000006189459&cidTexte=LEGITEXT000006072050",
      "Fiche Fin du CDD": "https://www.service-public.fr/particuliers/vosdroits/F40",
      "Fiche La prime de précarité est-elle due": "https://www.service-public.fr/particuliers/vosdroits/F803",
      "Le travail saisonnier": "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-travail-saisonnier",
      "La prime de précarité n'est pas due si": "https://www.easycdd.com/LEGISLATION-CDD/Fin-ou-rupture-du-contrat-CDD/La-prime-de-precarite/La-prime-de-precarite-n-est-pas-due-si",
      "Poursuite de l'activité après la fin du CDD": "https://www.easycdd.com/LEGISLATION-CDD/Fin-ou-rupture-du-contrat-CDD/Poursuite-de-l-activite-apres-la-fin-du-contrat-CDD"
    }
  },
  "contrat salarié . ATMP": {
    "titre": "Cotisation Accidents du Travail et Maladies Professionnelles",
    "description": "Cotisation due au titre des Accidents du Travail et Maladies Professionnelles.",
    "cotisation": {
      "dû par": "employeur",
      "branche": "accidents du travail et maladies professionnelles",
      "destinataire": "Urssaf",
      "responsable": "CARSAT"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux [ref]": {
          "variations": [
            {
              "si": "taux connu",
              "alors": "taux personnalisé"
            },
            {
              "si": "taux réduit",
              "alors": "0.8%"
            },
            {
              "sinon": "ATMP . taux collectif ATMP"
            }
          ]
        }
      }
    },
    "références": {
      "taux réduit 2020 (code 00.00B)": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000039684705"
    }
  },
  "contrat salarié . ATMP . taux minimum": {
    "description": "Le taux minimum existant pour la cotisation ATMP. Utilisé notamment pour le calcul de la réduction générale de cotisations",
    "variations": [
      {
        "si": "année = 2021",
        "alors": "0.70 %"
      },
      {
        "si": "année = 2022",
        "alors": "0.59%"
      }
    ],
    "références": {
      "Article D241-2-4": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000041460928&cidTexte=LEGITEXT000006073189&dateTexte=20200101",
      "Mise à jour 2022": "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000044793102"
    }
  },
  "contrat salarié . ATMP . taux moyen": {
    "formule": "2.24%",
    "références": {
      "Arrêté tarification AT/MP 2020": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000039684705"
    }
  },
  "contrat salarié . ATMP . taux réduit": {
    "titre": "taux réduit pour activité sans risque",
    "question": "L'activité de l'établissement ou du salarié est-elle sans aucun risque ?",
    "description": "Ce taux correspond :\n- aux petites entreprises dont l'activité n'est pas risquée, par exemple du conseil en informatique\n- au nouveau \"taux support\" : pour les entreprises d'effectif inférieur à 150, les salariés des fonctions support (par exemple, secrétariat, comptabilité, ressources humaines) cotisent à un taux réduit.\n",
    "applicable si": "entreprise . effectif <= 150",
    "par défaut": "non",
    "références": {
      "fiche ameli.fr": "https://www.ameli.fr/employeur/actualites/evolution-de-la-tarification-de-lassurance-maladie-risques-professionnels-ce-qui-change"
    }
  },
  "contrat salarié . ATMP . taux connu": {
    "question": "Connaissez-vous le taux AT/MP applicable à votre entreprise ?",
    "par défaut": "non",
    "description": "Le taux de la cotisation Accident du Travail et Maladie Professionnel varie selon l'activité de l'entreprise, pour refleter le niveau de risque auxquels sont exposé leur salariés.\n\nLes entreprises de moins de 20 salariés sont assujetties à ce taux collectif commun à toute leur branche.\n\nA partir de 150 employé, le taux est individualisé en fonction des relevés réels des accidents et maladies professionnels de l'entreprise.\n\nEntre les deux, le taux est modulé.\n\nCe taux n'a pas d'influence sur le net car il s'agit d'une cotisation à la charge de l'employeur.\n",
    "références": {
      "Description compte ATMP": "https://www.ameli.fr/entreprise/votre-entreprise/compte-accidents-du-travail-et-maladies-professionnelles/mp/teleservice-compte-atmp",
      "Accès compte ATMP (entreprise)": "https://www.net-entreprises.fr/declaration/compte-atmp/#lessentiel"
    }
  },
  "contrat salarié . ATMP . taux personnalisé": {
    "question": "Quel est le taux AT/MP de l'entreprise ?",
    "description": "Les entreprises de plus de 20 salariés ont un taux individualisé. L'entreprise peut consulter son taux effectif directement sur espace net-entreprise.\n",
    "références": {
      "Accès compte ATMP (entreprise)": "https://www.net-entreprises.fr/declaration/compte-atmp/"
    },
    "par défaut": "taux moyen"
  },
  "contrat salarié . ATMP . taux collectif ATMP": {
    "titre": "Taux collectif ATMP",
    "non applicable si": "taux connu",
    "question": "De quel domaine d'activité dépend votre entreprise ?",
    "description": "Les entreprises de moins de 20 salariés sont assujetties à ce taux collectif. Pour les entreprises plus importantes,\nce taux est modulé (jusqu'à 150 salariés) voire individualisé (au-delà).\n",
    "par défaut": "taux moyen",
    "references": {
      "Arrêté tarification AT/MP 2020": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000039684705"
    }
  },
  "contrat salarié . CDD . événement": {
    "titre": "Événement de contrat",
    "question": "Pensez-vous être confronté à l'un de ces événements au cours du contrat ?",
    "description": "Certains événements impactent fortement les obligations du CDD.\n\n> Par exemple, dans l'hypothèse d'une poursuite du CDD en CDI, aucune majoration ou indemnité sur le CDD ne sera à verser.\n",
    "formule": {
      "une possibilité": {
        "possibilités": [
          "poursuite du CDD en CDI",
          "refus CDI avantageux",
          "rupture anticipée salarié",
          "rupture pour faute grave ou force majeure",
          "rupture pendant période essai"
        ]
      }
    },
    "par défaut": "non"
  },
  "contrat salarié . CDD . événement . poursuite du CDD en CDI": {
    "titre": "Poursuite du CDD en CDI",
    "description": "En fin de contrat, le CDD est reconduit en CDI sans interruption.",
    "formule": "contrat salarié . CDD . événement = 'poursuite du CDD en CDI'"
  },
  "contrat salarié . CDD . événement . refus CDI avantageux": {
    "titre": "Refus d'un CDI avantageux",
    "description": "Le salarié, au terme du CDD, refuse une reconduction en CDI pour un emploi similaire, et une rémunération au moins aussi avantageuse.",
    "formule": "contrat salarié . CDD . événement = 'refus CDI avantageux'"
  },
  "contrat salarié . CDD . événement . rupture anticipée salarié": {
    "titre": "Rupture anticipée du salarié",
    "description": "Rupture anticipée du contrat à l'initiative du salarié.",
    "formule": "contrat salarié . CDD . événement = 'rupture anticipée salarié'"
  },
  "contrat salarié . CDD . événement . rupture pour faute grave ou force majeure": {
    "titre": "Rupture pour faute grave ou force majeure",
    "formule": "contrat salarié . CDD . événement = 'rupture pour faute grave ou force majeure'"
  },
  "contrat salarié . CDD . événement . rupture pendant période essai": {
    "titre": "Rupture pendant la période d'essai",
    "formule": "contrat salarié . CDD . événement = 'rupture pendant période essai'"
  },
  "contrat salarié . CDD . motif": {
    "titre": "Motif de recours",
    "question": "Quel est le motif de recours au CDD ?",
    "description": "Le CDD est un contrat d'exception: son recours doit être autorisé par l'un des motifs spécifiés dans la loi.\n",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "classique",
          "contrat aidé",
          "complément formation",
          "issue d'apprentissage"
        ]
      }
    },
    "par défaut": "'classique . accroissement activité'",
    "références": {
      "Code du travail - Articles L1242-1 à 4": "https://www.legifrance.gouv.fr/affichCode.do;jsessionid=E318966AA9DEB9E32465297F15B04D86.tpdila20v_1?idSectionTA=LEGISCTA000006195639&cidTexte=LEGITEXT000006072050&dateTexte=20170420",
      "le recours au CDD": "http://www.entreprises.cci-paris-idf.fr/web/reglementation/developpement-entreprise/droit-social/le-recours-au-cdd",
      "embaucher en CDD": "https://www.service-public.fr/particuliers/vosdroits/F34",
      "les cas de recours au CDD": "https://www.easycdd.com/LEGISLATION-CDD/Avant-de-rediger-un-contrat-CDD/Les-cas-de-recours-au-contrat-CDD"
    }
  },
  "contrat salarié . CDD . motif . classique": {
    "titre": "motifs classiques",
    "formule": {
      "une possibilité": {
        "possibilités": [
          "remplacement",
          "accroissement activité",
          "saisonnier",
          "usage",
          "mission"
        ]
      }
    },
    "références": {
      "Code du travail - Article L1242-2": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000033024658&cidTexte=LEGITEXT000006072050&dateTexte=20170420"
    },
    "par défaut": "'usage'"
  },
  "contrat salarié . CDD . motif . classique . saisonnier": {
    "titre": "Saisonnier",
    "formule": "contrat salarié . CDD . motif = 'classique . saisonnier'",
    "description": "Emplois à caractère saisonnier, dont les tâches sont appelées à se répéter chaque année selon une périodicité à peu près fixe, en fonction du rythme des saisons ou des modes de vie collectifs."
  },
  "contrat salarié . CDD . motif . classique . accroissement activité": {
    "titre": "Accroissement temporaire d'activité",
    "formule": "contrat salarié . CDD . motif = 'classique . accroissement activité'",
    "description": "Accroissement temporaire de l'activité de l'entreprise"
  },
  "contrat salarié . CDD . motif . classique . remplacement": {
    "titre": "Contrat de remplacement",
    "formule": "contrat salarié . CDD . motif = 'classique . remplacement'",
    "description": "Nous regroupons dans cette catégorie les cas suivants.\n\n- Remplacement d'un salarié en cas :\n  - D'absence ;\n  - De passage provisoire à temps partiel, conclu par avenant à son contrat de travail ou par échange écrit entre ce salarié et son employeur ;\n  - De suspension de son contrat de travail ;\n  - De départ définitif précédant la suppression de son poste de travail après consultation du comité d'entreprise ou, à défaut, des délégués du personnel, s'il en existe ;\n  - D'attente de l'entrée en service effective du salarié recruté par contrat à durée indéterminée appelé à le remplacer ;\n\n- Remplacement d'un chef d'entreprise artisanale, industrielle ou commerciale, d'une personne exerçant une profession libérale, de son conjoint participant effectivement à l'activité de l'entreprise à titre professionnel et habituel ou d'un associé non salarié d'une société civile professionnelle, d'une société civile de moyens d'une société d'exercice libéral ou de toute autre personne morale exerçant une profession libérale ;\n\n- Remplacement du chef d'une exploitation agricole ou d'une entreprise mentionnée aux 1° à 4° de l'article L. 722-1 du code rural et de la pêche maritime, d'un aide familial, d'un associé d'exploitation, ou de leur conjoint mentionné à l'article L. 722-10 du même code dès lors qu'il participe effectivement à l'activité de l'exploitation agricole ou de l'entreprise ;\n"
  },
  "contrat salarié . CDD . motif . classique . mission": {
    "titre": "Contrat de mission",
    "formule": "contrat salarié . CDD . motif = 'classique . mission'",
    "description": "> Aussi appelé contrat à objet défini.\n\nRecrutement d'ingénieurs et de cadres, au sens des conventions collectives, en vue de la réalisation d'un objet défini lorsqu'un accord de branche étendu ou, à défaut, un accord d'entreprise le prévoit et qu'il définit :\n\n- Les nécessités économiques auxquelles ces contrats sont susceptibles d'apporter une réponse adaptée ;\n- Les conditions dans lesquelles les salariés sous contrat à durée déterminée à objet défini bénéficient de garanties relatives à l'aide au reclassement, à la validation des acquis de l'expérience, à la priorité de réembauche et à l'accès à la formation professionnelle continue et peuvent, au cours du délai de prévenance, mobiliser les moyens disponibles pour organiser la suite de leur parcours professionnel ;\n- Les conditions dans lesquelles les salariés sous contrat à durée déterminée à objet défini ont priorité d'accès aux emplois en contrat à durée indéterminée dans l'entreprise.\n"
  },
  "contrat salarié . CDD . motif . classique . usage": {
    "titre": "Contrat d'usage",
    "alias": "motif extra",
    "formule": "contrat salarié . CDD . motif = 'classique . usage'",
    "description": "Emplois pour lesquels, dans certains secteurs d'activité définis par décret ou par convention ou accord collectif de travail étendu, il est d'usage constant de ne pas recourir au contrat de travail à durée indéterminée en raison de la nature de l'activité exercée et du caractère par nature temporaire de ces emplois ;",
    "références": {
      "Embauche en contrat d'extra": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33693"
    },
    "formule-futur": {
      "contrainte": {
        "variable": "entreprise . secteur activité",
        "possibilités": [
          "Déménagement",
          "Services à la personne",
          "Hôtellerie, restauration",
          "Centre de loisirs et de vacances",
          "Activité foraine",
          "Sport professionnel",
          "Enseignement",
          "Spectacle",
          "Action culturelle",
          "Audiovisuel, production cinématographique, édition phonographique",
          "Exploitation forestière",
          "Réparation navale",
          "Information",
          "Enquêtes, sondages",
          "Entreposage et stockage de la viande",
          "Bâtiment et travaux publics pour les chantiers à l'étranger",
          "Coopération, assistance technique d'ingénierie et de recherche à l'étranger",
          "Recherche scientifique dans le cadre d'un accord international (convention, arrangement administratif)",
          "Assistance technique ou logistique dans les institutions internationales ou dans l'Union européenne prévu par les traités"
        ]
      }
    }
  },
  "contrat salarié . CDD . motif . complément formation": {
    "titre": "Complément de formation professionnelle",
    "formule": "contrat salarié . CDD . motif = 'complément formation'",
    "description": "L'employeur s'engage, pour une durée et dans des conditions déterminées par décret, à assurer un complément de formation professionnelle au salarié.",
    "références": {
      "Code du travail - Article L1242-3": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000006901196&cidTexte=LEGITEXT000006072050&dateTexte=20170420",
      "Code du travail - Décret D1242-3": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000018537448&cidTexte=LEGITEXT000006072050"
    }
  },
  "contrat salarié . CDD . motif . issue d'apprentissage": {
    "titre": "À l'issue d'un contrat d'apprentissage",
    "formule": "contrat salarié . CDD . motif = 'issue d'apprentissage'",
    "description": "A l'issue d'un contrat d'apprentissage, un contrat de travail à durée déterminée peut être conclu lorsque l'apprenti doit satisfaire aux obligations du service national dans un délai de moins d'un an après l'expiration du contrat d'apprentissage.\n",
    "références": {
      "Code du travail - Article L1242-4": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000028498598&cidTexte=LEGITEXT000006072050&dateTexte=20170420"
    }
  },
  "contrat salarié . CDD . motif . contrat aidé": {
    "titre": "Contrat aidé (CUI, alternance, ...)",
    "formule": "contrat salarié . CDD . motif = 'contrat aidé'",
    "références": {
      "Code du travail - Article L1242-3": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000006901196&cidTexte=LEGITEXT000006072050&dateTexte=20170420"
    }
  },
  "contrat salarié . CDD . durée contrat": {
    "icônes": "⏳",
    "titre": "durée du contrat",
    "question": "Quelle est la durée du contrat ?",
    "description": "[Cliquez ici](https://www.service-public.fr/professionnels-entreprises/vosdroits/F31211) pour connaître la durée maximale d'un CDD.\n",
    "références": {
      "Durée maximale d'un CDD (service-public.fr)": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31211"
    },
    "suggestions": {
      "18 mois": "18 mois",
      "1 an": "12 mois",
      "6 mois": "6 mois",
      "3 mois": "3 mois"
    },
    "par défaut": "1 mois"
  },
  "contrat salarié . CDD . contrat jeune vacances": {
    "titre": "Contrat jeune vacances",
    "question": "Est-ce un contrat jeune vacances ?",
    "description": "Aussi appelé CDD vendanges. Contrat conclu avec un jeune pendant ses vacances scolaires ou universitaires.",
    "note": "Ce n'est pas un motif de CDD.",
    "par défaut": "non"
  },
  "contrat salarié . CDD . indemnités salarié": {
    "titre": "Indemnités CDD",
    "description": "Cotisations employeur spécifiques au CDD",
    "formule": {
      "somme": [
        "prime de fin de contrat",
        "indemnité compensatrice de congés payés"
      ]
    }
  },
  "contrat salarié . apprentissage": {
    "description": "Le contrat d'apprentissage est un contrat de travail écrit à durée limitée (CDD) ou à durée indéterminée (CDI) entre un salarié et un employeur. Il permet à l'apprenti de suivre une formation en alternance en entreprise sous la responsabilité d'un maître d'apprentissage et en centre de formation des apprentis (CFA) pendant 1 à 3 ans.\n",
    "formule": "contrat salarié = 'apprentissage'",
    "rend non applicable": [
      "CSG et CRDS",
      "statut cadre",
      "statut JEI",
      "régime des impatriés",
      "temps de travail . temps partiel"
    ]
  },
  "contrat salarié . apprentissage . diplôme préparé": {
    "question": "Quel type de diplôme l'apprenti prépare-t-il ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "niveau bac ou moins",
          "niveau supérieur au bac"
        ]
      }
    },
    "par défaut": "'niveau supérieur au bac'"
  },
  "contrat salarié . apprentissage . diplôme préparé . niveau bac ou moins": {
    "titre": "Diplôme d'un niveau inférieur ou égal au bac",
    "formule": "diplôme préparé = 'niveau bac ou moins'",
    "description": "Concerne les diplôme de niveau V (CAP, BEP, CTM...) et de niveau IV (Bac Pro, BP, BTM)"
  },
  "contrat salarié . apprentissage . diplôme préparé . niveau supérieur au bac": {
    "titre": "Diplôme d'un niveau supérieur au bac",
    "formule": "diplôme préparé = 'niveau supérieur au bac'",
    "description": "Concerne les diplôme de niveau I (Master, Ingénieur, Grandes écoles...), de niveau II (License, BMS...), et de niveau III (BTS, SUT, BM, ...)"
  },
  "contrat salarié . apprentissage . ancienneté": {
    "question": "Depuis combien de temps l'apprenti est-il employé ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "moins d'un an",
          "moins de deux ans",
          "moins de trois ans",
          "moins de quatre ans"
        ]
      }
    },
    "par défaut": "'moins d'un an'"
  },
  "contrat salarié . apprentissage . ancienneté . moins d'un an": {
    "formule": "ancienneté = 'moins d'un an'"
  },
  "contrat salarié . apprentissage . ancienneté . moins de deux ans": {
    "formule": "ancienneté = 'moins de deux ans'"
  },
  "contrat salarié . apprentissage . ancienneté . moins de trois ans": {
    "formule": "ancienneté = 'moins de trois ans'"
  },
  "contrat salarié . apprentissage . ancienneté . moins de quatre ans": {
    "formule": "ancienneté = 'moins de quatre ans'",
    "type": "notification",
    "description": "La durée maximale du contrat peut être portée à 4 ans lorsque la qualité de travailleur handicapé est reconnue à l'apprenti."
  },
  "contrat salarié . professionnalisation": {
    "description": "Le contrat de professionnalisation est un contrat de travail en alternance\nréservé à un public prioritaire : jeunes de 16 à 25 ans dans le cadre de\nleur formation initiale, demandeurs d'emplois, bénéficiaires du RSA, ASS ou\nAAH, et les personnes ayant bénéficié d'un contrat unique d'insertion.\n\nIl peut prendre la forme d'un contrat à durée déterminée (CDD) ou\nindéterminée (CDI), la période de professionnalisation proprement-dite\ndevant durer entre 6 et 12 mois. Dans certains cas cette période peut être\nprolongée jusqu'à 36 mois.\n",
    "formule": "contrat salarié = 'professionnalisation'",
    "rend non applicable": "rémunération . contrôle smic",
    "références": {
      "Contrat de professionnalisation": "https://www.service-public.fr/particuliers/vosdroits/F15478"
    }
  },
  "contrat salarié . professionnalisation . jeune de moins de 30 ans": {
    "question": "Le salarié embauché a-t'il moins de 30 ans ?",
    "par défaut": "oui"
  },
  "contrat salarié . professionnalisation . salarié de 45 ans et plus": {
    "non applicable si": "jeune de moins de 30 ans",
    "question": "Le salarié embauché a-t'il 45 ans ou plus ?",
    "par défaut": "non"
  },
  "contrat salarié . stage": {
    "description": "Un employeur qui accueille un stagiaire doit lui verser une gratification minimale. Celle-ci est en partie exonérée de cotisations sociales.\n",
    "formule": "contrat salarié = 'stage'",
    "rend non applicable": [
      "statut cadre",
      "statut JEI",
      "réduction générale",
      "allocations familiales . taux réduit",
      "maladie . taux employeur . taux réduit",
      "lodeom",
      "contribution d'équilibre général",
      "retraite complémentaire",
      "chômage",
      "AGS",
      "complémentaire santé",
      "contribution au dialogue social",
      "déduction forfaitaire spécifique",
      "temps de travail . temps partiel",
      "temps de travail . heures supplémentaires",
      "régime des impatriés",
      "rémunération . contrôle smic",
      "contrat salarié . activité partielle"
    ]
  },
  "contrat salarié . stage . avertissement": {
    "formule": "oui",
    "type": "notification",
    "sévérité": "avertissement",
    "description": "Une convention de stage **n'est pas un contrat de travail**, et ne peut pas être conclue pour réaliser une tâche régulière correspondant à un poste de travail permanent, ou à un accroissement temporaire de l'activité de l'entreprise. [Code de l'éducation - Article L124-7](https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029234119&cidTexte=LEGITEXT000006071191)\nPar ailleurs, une entreprise de moins de 20 salariés ne peut pas accueillir plus de **3&nbsp;stagiaires**, et pas plus de **15% de l’effectif** pour les entreprises de plus de 20 salariés."
  },
  "contrat salarié . stage . contrôle gratification minimale": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "rémunération . brut de base < stage . gratification minimale",
    "description": "La rémunération du stage est inférieure à la [gratification minimale](https://www.service-public.fr/professionnels-entreprises/vosdroits/F32131)."
  },
  "contrat salarié . stage . gratification minimale": {
    "formule": "15% * plafond sécurité sociale temps plein",
    "références": {
      "Gratification minimale": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32131"
    }
  },
  "contrat salarié . exonération d'impôt des stagiaires et apprentis": {
    "description": "Les salaires versés aux apprentis ainsi que les gratifications de stages sont exonérés d'impôt sur le revenu dans la limite d'un SMIC annuel.\n",
    "références": {
      "Article 81 bis du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029236245&cidTexte=LEGITEXT000006069577"
    },
    "applicable si": {
      "une de ces conditions": [
        "apprentissage",
        "stage"
      ]
    },
    "formule": "SMIC"
  },
  "contrat salarié . CDD": {
    "formule": "contrat salarié = 'CDD'",
    "description": "Par défaut, faire travailler quelqu'un en France établit automatiquement un CDI à temps plein.\nCertaines situations exceptionnelles permettent aux employeurs de prévoir une date de fin. Le contrat, qui est alors nécessaire, mentionne cette date de fin.\n"
  },
  "contrat salarié . CDD . information": {
    "type": "notification",
    "formule": "oui",
    "description": "Rappelez-vous qu'un CDD doit toujours correspondre à un besoin temporaire de l'entreprise. [Code du travail - Article L1242-1](https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901194&cidTexte=LEGITEXT000006072050)"
  },
  "contrat salarié . cotisations . assiette": {
    "titre": "Assiette des cotisations sociales",
    "description": "L'assiette des cotisations sociales est la base de calcul d'un grand nombre de cotisations sur le travail salarié. Elle comprend notamment les rémunérations en espèces (salaire de base, indemnité, primes...) et les avantages en nature (logement, véhicule...).\n",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul.html"
    },
    "formule": {
      "valeur": "rémunération . brut",
      "abattement": {
        "somme": [
          "frais professionnels . part déductible",
          "stage . gratification minimale"
        ]
      }
    }
  },
  "contrat salarié . cotisations . assiette . salariale": {
    "titre": "Assiette des cotisations sociales",
    "description": "Les apprentis bénéficient d'une exonération de cotisations sociales jusqu'à 79% du SMIC.\n",
    "références": {
      "Urssaf": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-ou-aides-liees-a-la/le-contrat-dapprentissage/exonerations.html"
    },
    "formule": {
      "variations": [
        {
          "si": "apprentissage",
          "alors": {
            "valeur": "cotisations . assiette",
            "abattement": "79% * SMIC"
          }
        },
        {
          "sinon": "cotisations . assiette"
        }
      ]
    }
  },
  "contrat salarié . cotisations . assiette minimale": {
    "formule": {
      "recalcul": {
        "règle": "rémunération . assiette de vérification du SMIC",
        "avec": {
          "rémunération . brut de base": "SMIC horaire * temps de travail . temps effectif"
        }
      }
    }
  },
  "contrat salarié . rémunération . brut de base": {
    "titre": "Salaire brut",
    "identifiant court": "salaire-brut",
    "résumé": "Brut de référence (sans les primes, indemnités ni majorations)",
    "type": "salaire",
    "question": "Quel est votre salaire brut ?",
    "description": "C'est le salaire *brut* régulier inscrit dans le contrat de travail. Il ne change jamais entre les mois et ne peut pas être modifié sans signature des deux parties.\n\nIl ne comprend pas les indemnités, avantages sociaux, avantages en nature et primes...\n",
    "unité": "€/mois",
    "suggestions": {
      "salaire médian": "2300 €/mois",
      "SMIC": "SMIC contractuel"
    },
    "formule": {
      "inversion numérique": {
        "question": "Quel est le salaire ?",
        "titre": "salaire",
        "avec": [
          "prix du travail",
          "rémunération . total",
          "rémunération . net",
          "rémunération . net après impôt",
          "équivalent temps plein",
          "dirigeant . rémunération . totale"
        ]
      }
    },
    "références": {
      "Le salaire. Fixation et paiement": "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-salaire-fixation-et-paiement"
    }
  },
  "contrat salarié . rémunération . contrôle smic": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "assiette de vérification du SMIC < SMIC contractuel",
    "description": "Le salaire saisi est inférieur au SMIC."
  },
  "contrat salarié . rémunération . contrôle salaire élevé": {
    "type": "notification",
    "formule": {
      "toutes ces conditions": [
        "brut de base >= 10000 €/mois",
        "dirigeant = non"
      ]
    },
    "description": "Le salaire mensuel saisi est élevé. Ne vous êtes-vous pas trompé de période de calcul ?"
  },
  "contrat salarié . rémunération . brut de base . équivalent temps plein": {
    "applicable si": "temps de travail . temps partiel",
    "titre": "Salaire brut équivalent temps plein",
    "résumé": "Le salaire si l'embauche se faisait à temps plein",
    "question": "Quel est le salaire en équivalent temps plein ?",
    "unité": "€/mois",
    "formule": "brut de base / temps de travail . quotité de travail"
  },
  "contrat salarié . rémunération . taux horaire": {
    "unité": "€/heure",
    "formule": "assiette de vérification du SMIC / temps de travail"
  },
  "contrat salarié . rémunération . taux horaire . heures supplémentaires": {
    "titre": "taux horaire (heure supplémentaire)",
    "description": "Le taux horaire utilisé pour calculer la rémunération liée au heures supplémentaires. Il intègre les avantages en nature et les primes constituant la contrepartie d'un travail fourni.\n",
    "unité": "€/heure",
    "formule": "(assiette de vérification du SMIC + primes . fin d'année) / temps de travail . temps contractuel",
    "références": {
      "e-Paye (privé)": "https://e-paye.com/faq/les-heures-supplementaires-quelles-primes-inclure-dans-la-base-de-calcul-de-la-majoration-pour-heure-supplementaire/",
      "rfPaye (privé)": "https://rfpaye.grouperf.com/article/0168/ms/rfpayems0168_2027146.html",
      "legisocial": "https://www.legisocial.fr/actualites-sociales/1074-avantage-en-nature-et-heures-supplementaires-les-consequences-sur-le-bulletin-de-paie.html"
    }
  },
  "contrat salarié . rémunération . assiette de vérification du SMIC": {
    "description": "C'est le salaire pris en compte pour vérifier que le SMIC est atteint.\n",
    "unité": "€/mois",
    "formule": {
      "somme": [
        "brut de base",
        "avantages en nature . montant",
        "primes . activité"
      ]
    },
    "note": "Les primes de fin d'année ou de 13ième mois sont prises en compte dans l'assiette de vérification du SMIC mais seulement le mois où elles sont payées (et non de manière lissée sur l'année), c'est pourquoi nous ne les incluons pas dans cette formule.\n"
  },
  "contrat salarié . rémunération . assiette congés payés": {
    "titre": "Assiette pour le calcul de l'indemnité de congés payés",
    "description": "Pendant ses congés, le salarié ne perçoit pas son salaire. Il perçoit une indemnité de congés payés.\nToutes les sommes ayant le caractère de salaire sont prises en compte pour déterminer l'indemnité de congés payés. Les autres sommes ne sont pas prise en compte.",
    "formule": {
      "somme": [
        "brut de base",
        "heures supplémentaires",
        "heures complémentaires",
        "avantages en nature",
        "primes . ancienneté",
        "primes . activité",
        "CDD . prime de fin de contrat"
      ]
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F33359"
    }
  },
  "contrat salarié . rémunération . primes": {
    "description": "Les primes sont des compléments de salaire versés au salarié en vertu du\ncontrat de travail, de la convention collective, d'un usage d'entreprise, ou\nbien à titre bénévole par l'employeur.\n\nSauf exception, elles sont soumises aux cotisations sociales et à l'impôt\nsur le revenu.\n",
    "formule": {
      "somme": [
        "base",
        "activité",
        "primes . ancienneté",
        "fin d'année"
      ]
    }
  },
  "contrat salarié . rémunération . primes . base": {
    "formule": "0€/mois"
  },
  "contrat salarié . rémunération . primes . activité": {
    "unité": "€/mois",
    "titre": "primes d'activité",
    "description": "Primes et gratifications versées en contrepartie, ou à l’occasion du travail, directement liées à l’exécution par le salarié de sa prestation de travail. Tel est le cas, par exemple, d’une prime de vente exclusivement basée sur les résultats du salarié.\nCes primes sont prises en compte pour le calcul du salaire minimum\n",
    "formule": {
      "somme": [
        "activité . conventionnelles",
        "activité . base"
      ]
    }
  },
  "contrat salarié . rémunération . primes . activité . base": {
    "titre": "primes d'activité",
    "question": "Quel est le montant des primes liées à l'activité du salarié ?",
    "par défaut": "0 €/mois"
  },
  "contrat salarié . rémunération . primes . activité . conventionnelles": {
    "formule": "0 €/mois"
  },
  "contrat salarié . rémunération . primes . ancienneté": {
    "formule": "0 €/mois"
  },
  "contrat salarié . rémunération . primes . fin d'année": {
    "titre": "Prime de fin d'année ou de treizième mois",
    "description": "Cette prime est le plus souvent versée en une seule fois à la fin de\nl'année.\n\nLes salariés à temps partiel ont dont à la prime de fin d'année dans les\nmêmes conditions que les autres salariés en proportion de leur durée du\ntravail.\n",
    "formule": {
      "produit": {
        "assiette": "assiette de vérification du SMIC * temps de travail . quotité de travail / 1 an",
        "facteur": "prime de fin d'année en mois"
      }
    }
  },
  "contrat salarié . rémunération . primes . fin d'année . prime de fin d'année en mois": {
    "applicable si": "treizième mois",
    "formule": "13 mois - 1 an",
    "note": "Certaines entreprises proposent une prime de fin d'année sur une base de 13,5 mois, 14 mois voire 15 mois.\n"
  },
  "contrat salarié . rémunération . primes . fin d'année . treizième mois": {
    "question": "Le salarié bénéficie-t-il d'un treizième mois ?",
    "description": "La prime de treizième mois est un avantage accordé au salarié qui peut être prévu par la convention collective ou le contrat de travail. Elle est généralement versée en fin d'année.\n",
    "par défaut": "non"
  },
  "contrat salarié . rémunération . brut": {
    "description": "Toutes les sommes versées au salarié sous forme monétaire en échange de son travail.",
    "titre": "Rémunération brute",
    "somme": [
      "rémunération . brut de base",
      "avantages en nature . montant",
      "primes",
      "CDD . indemnités salarié",
      "heures supplémentaires",
      "heures complémentaires",
      "frais professionnels",
      "prévoyance . employeur",
      "retraite supplémentaire . employeur"
    ],
    "abattement": "activité partielle . retrait absence"
  },
  "contrat salarié . rémunération . heures supplémentaires": {
    "titre": "rémunération heures supplémentaires",
    "description": "La rémunération relative aux heures supplémentaires",
    "formule": {
      "produit": {
        "assiette": "taux horaire . heures supplémentaires",
        "facteur": {
          "somme": [
            "temps de travail . heures supplémentaires",
            "temps de travail . heures supplémentaires . majoration"
          ]
        }
      }
    }
  },
  "contrat salarié . rémunération . heures complémentaires": {
    "titre": "rémunération heures complémentaires",
    "description": "La rémunération relative aux heures complémentaires",
    "formule": {
      "produit": {
        "assiette": "taux horaire . heures supplémentaires",
        "facteur": {
          "somme": [
            "temps de travail . heures complémentaires",
            "temps de travail . heures complémentaires . majoration"
          ]
        }
      }
    }
  },
  "contrat salarié . rémunération . revenus de remplacement": {
    "description": "Les revenus de remplacement sont les revenus perçus en remplacement de la rémunération du travail : allocations de chômage ou de chômage partiel, indemnités maladie ou accident du travail, pension de retraite, revenu d'intégration sociale, etc.\nCes revenus sont imposables mais sont exonérés de cotisations sociales. Ils sont soumis à la CSG/CRDS avec un taux spécifique.",
    "formule": {
      "somme": [
        "activité partielle . indemnités"
      ]
    },
    "note": "L'indemnité complémentaire n'est pas ajoutée ici car elle est systématiquement exonérée de CSG du fait de l'écrêtement pour les bas revenus.\nL'ajouter abouti à un calcul cyclique (vu qu'elle dépend du montant de la CSG)"
  },
  "contrat salarié . avantages sociaux": {
    "description": "Ce sont les avantages sociaux payés par l'employeur. Ils sont spécifiques à l'entreprise, et fournis par des structures privées (mutuelle, assurance...). Ils sont soumis à l'impôt sur le revenu.\n",
    "unité": "€/mois",
    "formule": {
      "somme": [
        "prévoyance . employeur",
        "retraite supplémentaire . employeur",
        "prévoyance obligatoire cadre",
        "complémentaire santé . employeur"
      ]
    }
  },
  "contrat salarié . rémunération . avantages en nature": {
    "icônes": "🛏️🚗🥗📱",
    "titre": "Avantages en nature",
    "description": "Les avantages en nature sont constitués par la fourniture par l’entreprise à ses travailleurs d’un bien ou service. La mise à disposition peut être gratuite ou moyennant une participation du bénéficiant inférieure à leur valeur réelle.\n\n\nL’avantage en nature doit figurer sur le bulletin de paie. Il sera indiqué au niveau du salaire brut pour être soumis à cotisations. Après détermination du salaire net imposable, il sera déduit du salaire net à verser.\n",
    "question": "L'entreprise fournit-elle des avantages en nature (repas, véhicule, téléphone, réductions, logement...) ?",
    "par défaut": "non"
  },
  "contrat salarié . rémunération . avantages en nature . montant": {
    "titre": "Avantages en nature",
    "description": "Les avantages en nature sont soumis aux cotisations et à l'impôt sur le revenu. Ils sont pris en compte pour vérifier que le salaire minimum est atteint.\n",
    "formule": {
      "somme": [
        "nourriture . montant",
        "ntic . montant",
        "autres . montant"
      ]
    }
  },
  "contrat salarié . rémunération . avantages en nature . ntic": {
    "icônes": "💻📱",
    "description": "L’usage privé des outils NTIC mis à disposition dans le cadre de l’activité professionnelle à titre permanent est constitutif d’un avantage en nature.\n\n\nCet avantage est inclus dans la base de calcul des cotisations de Sécurité sociale et d’assurance chômage.\n\n\nLa réalité de l’usage privé peut résulter soit d’un document écrit (contrat de travail, accord d’entreprise, règlement intérieur, courrier de la direction de l’entreprise autorisant le salarié à faire un usage privé des outils), soit de l’existence de factures détaillées permettant d’établir une utilisation privée.\n",
    "question": "L'entreprise fournit-elle gratuitement un outil issus des NTIC (ordinateur, téléphone, tablette, etc.) ?\n",
    "par défaut": "oui"
  },
  "contrat salarié . rémunération . avantages en nature . autres": {
    "question": "Y a-t-il d'autres avantages en natures (logement, véhicule, réduction...) ?\n",
    "par défaut": "non"
  },
  "contrat salarié . rémunération . avantages en nature . autres . montant": {
    "titre": "autres",
    "question": "Quel est le montant de ces autres avantages ?\n",
    "par défaut": "0 €/mois",
    "suggestions": {
      "🚗 véhicule": "260 €/mois"
    }
  },
  "contrat salarié . rémunération . avantages en nature . ntic . montant": {
    "titre": "outils NTIC",
    "description": "Pour les avantages en nature de type NTIC (ordinateurs, smartphones, tablettes...), il y a une évaluation forfaitaire annuelle correspondant à 10% du prix d'achat. Par exemple, pour un téléphone acheté à 850€ TTC avec un abonnement de 30€ / mois, l'avantage en nature à reporter sur le bulletin de paie sera de :\n\n```\n[10% x (850€ + (30€ x 12 mois)) ] / 12 mois\n```\n soit 10,08€\n",
    "formule": {
      "produit": {
        "assiette": {
          "somme": [
            "coût appareils",
            "abonnements * 12 mois"
          ]
        },
        "taux": "10% /an"
      }
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-avantages-en-nature/les-outils-issus-des-nouvelles-t/dans-quel-cas-la-mise-a-disposit/levaluation-forfaitaire.html"
    }
  },
  "contrat salarié . rémunération . avantages en nature . ntic . coût appareils": {
    "question": "Quel est le coût total neuf des appareils mis à disposition ?\n",
    "par défaut": "800 €",
    "suggestions": {
      "📱": "400 €",
      "📱✨ (haut de gamme)": "850 €",
      "💻": "1200 €",
      "💻 + 📱✨": "2050 €"
    }
  },
  "contrat salarié . rémunération . avantages en nature . ntic . abonnements": {
    "question": "Quel est le coût de l'abonnement (forfait mobile, etc.) pris en charge par l'employeur ?",
    "par défaut": "20 €/mois",
    "suggestions": {
      "aucun": "0 €/mois",
      "standard": "20 €/mois",
      "international": "40 €/mois"
    }
  },
  "contrat salarié . rémunération . avantages en nature . nourriture": {
    "icônes": "🍝",
    "question": "L'entreprise fournit-elle gratuitement des repas ?\n",
    "par défaut": "non",
    "description": "Les titres-restaurant ne sont pas considérés comme un avantage en nature mais comme un remboursement de frais.\n"
  },
  "contrat salarié . rémunération . avantages en nature . nourriture . montant": {
    "titre": "nourriture",
    "unité": "€/mois",
    "formule": {
      "produit": {
        "assiette [ref repas forfaitaire]": "4.85 €/repas",
        "facteur": "repas par mois"
      }
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/taux-et-baremes/avantages-en-nature/nourriture.html"
    }
  },
  "contrat salarié . rémunération . avantages en nature . nourriture . repas par mois": {
    "question": "Combien de repas par mois sont payés par l'entreprise ?\n",
    "par défaut": "21 repas/mois",
    "suggestions": {
      "1 par jour": "21 repas/mois",
      "2 par jour": "42 repas/mois"
    }
  },
  "contrat salarié . statut cadre": {
    "question": "Le salarié a-t-il le statut cadre ?",
    "description": "Un cadre d'entreprise est un employé ou dirigeant d'une entreprise\nappartenant à la catégorie supérieure des salariés. Il s'agit d'un statut\nreconnu par les conventions collectives, qui détermine l'appartenance à une\ncaisse de retraite spécifique, l'AGIRC, et quelques modalités spécifiques du\ncontrat de travail.\n\n\nReconnaissant initialement les compétences techniques et le rôle\nd'encadrement du salarié, le statut s'est progressivement élargi à un\nensemble de postes de plus en plus nombreux, et a fini par recouvrir une\nlarge population, mêlant managers, experts et dirigeants.\n\n\nIl s'agit d'une notion mal définie désignant des concepts différents selon\nle point de vue envisagé — que ce soit en termes de statut, de\nreprésentation sociale, de rôle dans l'entreprise ou de culture.\n",
    "par défaut": "non",
    "références": {
      "wikipedia.fr": "https://fr.wikipedia.org/wiki/Cadre_d%27entreprise"
    }
  },
  "contrat salarié . plafond sécurité sociale": {
    "acronyme": "PSS",
    "unité": "€/mois",
    "formule": {
      "valeur": "plafond sécurité sociale temps plein * temps de travail . quotité de travail effective",
      "plancher": "1 €/mois"
    }
  },
  "contrat salarié . plafond sécurité sociale . renonciation proratisation": {
    "description": "D'un commun accord, l'employeur et l'employé peuvent renoncer à la réduction du plafond de la sécurité sociale (applicable pour les salariés à temps partiel), notamment afin d'augmenter le montant des cotisations vieillesse.",
    "valeur": "non",
    "applicable si": "temps de travail . quotité de travail < 100%",
    "remplace": [
      {
        "règle": "plafond sécurité sociale",
        "par": "plafond sécurité sociale temps plein"
      }
    ]
  },
  "contrat salarié . SMIC contractuel": {
    "description": "Valeur du SMIC pro-ratisé pour prendre en compte le temps partiel et utilisé pour la détermination du salaire minimum\n",
    "formule": "SMIC temps plein * temps de travail . quotité de travail"
  },
  "contrat salarié . SMIC": {
    "description": "Plusieurs réductions de cotisations ([réduction générale](/documentation/contrat-salarié/réduction-générale), taux réduit d'[allocations familiales](/documentation/contrat-salarié/allocations-familiales/taux-réduit) et de [maladie](/documentation/contrat-salarié/maladie/taux-employeur/taux-réduit), réduction outre-mer) reposent sur un paramètre SMIC faisant l'objet de plusieurs ajustements pour prendre en compte le temps de travail effectif.\n\nLes heures supplémentaires et les heures complémentaires sont prises en\ncompte sans tenir compte de la majoration.\n",
    "formule": "temps de travail * SMIC horaire",
    "références": {
      "Détermination du SMIC": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction/etape-1--determination-du-coeffi/determination-du-smic-a-prendre.html"
    }
  },
  "contrat salarié . cotisations . réductions de cotisations": {
    "titre": "Réductions de cotisations",
    "formule": {
      "somme": [
        "patronales . réductions de cotisations",
        "salariales . réductions de cotisations"
      ]
    }
  },
  "contrat salarié . cotisations . salariales": {
    "titre": "cotisations salariales",
    "somme": [
      "vieillesse . salarié",
      "maladie . salarié",
      "retraite complémentaire . salarié",
      "contribution d'équilibre général . salarié",
      "contribution d'équilibre technique . salarié",
      "chômage . salarié",
      "CSG et CRDS",
      "APEC . salarié",
      "complémentaire santé . salarié",
      "conventionnelles"
    ],
    "abattement": "réductions de cotisations"
  },
  "contrat salarié . cotisations . patronales": {
    "titre": "cotisations patronales",
    "somme": [
      "maladie . employeur",
      "ATMP",
      "prévoyance obligatoire cadre",
      "vieillesse . employeur",
      "retraite complémentaire . employeur",
      "complémentaire santé . employeur",
      "contribution d'équilibre général . employeur",
      "contribution d'équilibre technique . employeur",
      "allocations familiales",
      "chômage . employeur",
      "APEC . employeur",
      "AGS",
      "FNAL",
      "participation effort de construction",
      "contribution au dialogue social",
      "formation professionnelle",
      "versement transport",
      "taxe d'apprentissage",
      "CDD . CPF",
      "forfait social",
      "conventionnelles"
    ],
    "abattement": "réductions de cotisations"
  },
  "contrat salarié . rémunération": {
    "formule": "oui",
    "description": "La rémunération se distingue du salaire en incluant les avantages non monétaires versés en contrepartie du travail. Elle est donc plus large que les sommes d'argent versées au salarié."
  },
  "contrat salarié . rémunération . net de cotisations": {
    "titre": "Salaire net de cotisations",
    "type": "rémunération",
    "formule": {
      "somme": [
        "brut",
        "(- cotisations . salariales)"
      ]
    }
  },
  "contrat salarié . rémunération . net avec revenus de remplacement": {
    "formule": {
      "somme": [
        "net de cotisations",
        "revenus de remplacement",
        "(- CSG et CRDS . revenus de remplacement)",
        "(- cotisations . maladie sur les revenus de remplacement)"
      ]
    }
  },
  "contrat salarié . rémunération . net imposable": {
    "titre": "Salaire net imposable",
    "type": "salaire",
    "description": "C'est la base utilisée pour calculer l'impôt sur le revenu.\n",
    "valeur": {
      "nom": "base",
      "description": "Le net imposable avant les exonérations et déductions",
      "somme": [
        "net avec revenus de remplacement",
        "avantages sociaux",
        "CSG et CRDS . non déductible"
      ]
    },
    "abattement": {
      "somme": [
        "frais professionnels . part déductible",
        "prime d'impatriation",
        "exonération d'impôt des stagiaires et apprentis",
        "heures supplémentaires et complémentaires défiscalisées",
        "retraite supplémentaire . exonération fiscale",
        "prévoyance . exonération fiscale"
      ]
    },
    "références": {
      "DSN": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    }
  },
  "contrat salarié . rémunération . net imposable . heures supplémentaires et complémentaires défiscalisées": {
    "unité": "€/mois",
    "formule": {
      "valeur": {
        "somme": [
          "heures supplémentaires",
          "heures complémentaires"
        ]
      },
      "plafond": "5358 €/an"
    },
    "références": {
      "DSN": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    }
  },
  "contrat salarié . prime d'impatriation": {
    "description": "La prime d'impatriation est une partie de la rémunération exonérée d'impôt sur le revenu.",
    "applicable si": "régime des impatriés",
    "formule": {
      "produit": {
        "assiette": "rémunération . net imposable . base",
        "taux": "30%"
      }
    },
    "références": {
      "Article 155B du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069577&idArticle=LEGIARTI000006307476&dateTexte=&categorieLien=cid",
      "Bofip": "https://bofip.impots.gouv.fr/bofip/5677-PGP"
    }
  },
  "contrat salarié . rémunération . net": {
    "titre": "Salaire net",
    "identifiant court": "salaire-net",
    "unité": "€/mois",
    "type": "salaire",
    "question": "Quel est votre salaire net ?",
    "résumé": "Salaire net avant impôt",
    "description": "C'est le montant que le salarié toucherait à la fin du mois avant de payer l'impôt sur le revenu.\nAussi appelé salaire net à payer (c'était du moins le cas avant l'impôt à la source).\n\nCette somme peut varier en fonction de décisions politiques (augmentation ou diminution des cotisations) alors que le salaire brut est contractuel (pour le changer, il faut signer un avenant au contrat).",
    "formule": {
      "somme": [
        "net avec revenus de remplacement",
        "(- avantages en nature . montant)",
        "(- frais professionnels . titres-restaurant . montant)"
      ]
    }
  },
  "contrat salarié . rémunération . net après impôt": {
    "titre": "Salaire net après impôt",
    "identifiant court": "salaire-net-apres-impot",
    "résumé": "Versé sur le compte bancaire",
    "question": "Quel est le revenu net du salarié après impôt ?",
    "type": "salaire",
    "unité": "€/mois",
    "description": "Le 1er janvier 2019, l'impôt sur le revenu est prélevé à la source et apparaît donc sur la fiche de paie.\n\nNotre calcul retient le salaire net après déduction de l'impôt **neutre** (aussi appelé taux non personnalisé).\n\nC'est une bonne estimation du revenu net d'une personne en l'absence d'informations sur sa situation (c'est un cas par défaut : célibataire sans enfants ni patrimoine).\n\nPour une simulation plus complète, rendez-vous sur [impots.gouv.fr](https://www3.impots.gouv.fr/simulateur/calcul_impot/2018/index.htm).\n",
    "références": {
      "Explication de l'impôt à la source": "https://www.economie.gouv.fr/prelevement-a-la-source"
    },
    "formule": "net - impôt . montant"
  },
  "contrat salarié . prix du travail": {
    "titre": "Coût total",
    "identifiant court": "cout-embauche",
    "résumé": "Dépensé par l'entreprise",
    "question": "Quel est le coût total de cette embauche ?",
    "description": "Coût total d'embauche d'un salarié en incluant, en plus des éléments de rémunération, les aides différées\n> C'est donc aussi une mesure de la valeur apportée par le salarié à l'entreprise : l'employeur est prêt à verser cette somme en contrepartie du travail fourni.\n\nÀ ce coût total, il ne faut pas oublier d'ajouter les dépenses spécifiques à votre entreprise : recherche du bon candidat, poste de travail, équipement, formation initiale, médecine du travail, etc.\n",
    "somme": [
      "rémunération . total",
      "taxe sur les salaires"
    ],
    "abattement": "aides employeur",
    "unité": "€/mois"
  },
  "contrat salarié . rémunération . total": {
    "titre": "Total chargé",
    "question": "Quelle est la rémunération chargée ?",
    "résumé": "Dépensé par l'entreprise",
    "type": "salaire",
    "unité": "€/mois",
    "description": "C'est le total que l'employeur doit verser pour employer un salarié.\n",
    "formule": {
      "somme": [
        "brut",
        "cotisations . patronales",
        "activité partielle . indemnités"
      ]
    }
  },
  "contrat salarié . cotisations . salariales . réductions de cotisations": {
    "titre": "réductions salariales",
    "formule": "réduction heures supplémentaires"
  },
  "contrat salarié . cotisations . patronales . réductions de cotisations": {
    "titre": "réductions patronales",
    "description": "À l'exception de la déduction heure supplémentaire, les dispositifs de réduction de cotisations patronales sont mutuellement exclusif.\nLe formule ci dessous selectionne donc automatiquement le plus avantageux pour l'employeur.",
    "formule": {
      "somme": [
        "déduction heures supplémentaires",
        {
          "le maximum de": [
            "réduction générale",
            "lodeom . réduction outre-mer",
            "statut JEI . exonération de cotisations",
            "dirigeant . assimilé salarié . réduction ACRE"
          ]
        }
      ]
    },
    "références": {
      "urssaf.fr (cumul réduction générale)": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/les-regles-relatives-au-cumul.html",
      "urssaf.fr (cumul JEI)": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-ou-aides-liees-au-s/jeunes-entreprises-innovantes/regles-de-cumul.html"
    }
  },
  "contrat salarié . cotisations . patronales . réductions de cotisations . déduction heures supplémentaires": {
    "applicable si": "entreprise . effectif < 20",
    "titre": "déduction forfaitaire pour heures supplémentaires",
    "formule": {
      "produit": {
        "assiette": "temps de travail . heures supplémentaires",
        "facteur": "1.50 €/heure"
      }
    },
    "note": "La déduction ne s’applique pas aux heures complémentaires",
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-deduction-forfaitaire-patrona/employeurs-concernes.html"
    }
  },
  "contrat salarié . cotisations . salariales . réduction heures supplémentaires": {
    "cotisation": {
      "branche": "retraite",
      "dû par": "salarié"
    },
    "aide": {
      "type": "réduction de cotisations"
    },
    "formule": "rémunération . heures supplémentaires * taux des cotisations réduites",
    "références": {
      "Code de la sécurité sociale - Article D241-21": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000038056813&cidTexte=LEGITEXT000006073189"
    }
  },
  "contrat salarié . cotisations . salariales . réduction heures supplémentaires . taux des cotisations réduites": {
    "unité": "%",
    "description": "le taux effectif des cotisations d'assurance vieillesse à la charge du salarié",
    "formule": {
      "valeur": {
        "produit": {
          "assiette": {
            "somme": [
              "vieillesse . salarié",
              "retraite complémentaire . salarié",
              "contribution d'équilibre général . salarié"
            ]
          },
          "facteur": "1 / assiette"
        }
      },
      "plafond": "11.31%"
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-de-cotisations-sala/modalites-de-calcul-et-de-declar.html",
      "Circulaire DSS/5B/2019/71": "http://circulaire.legifrance.gouv.fr/pdf/2019/04/cir_44492.pdf"
    }
  },
  "contrat salarié . cotisations": {
    "description": "Total des cotisations patronales et salariales",
    "formule": {
      "somme": [
        "patronales",
        "salariales"
      ]
    }
  },
  "contrat salarié . cotisations . salariales . conventionnelles": {
    "titre": "cotisations salariales conventionnelles",
    "description": "Cotisations spécifiques à la convention collective",
    "formule": "0 €/mois"
  },
  "contrat salarié . cotisations . patronales . conventionnelles": {
    "titre": "cotisations patronales conventionnelles",
    "description": "Cotisations spécifiques à la convention collective",
    "formule": "0 €/mois"
  },
  "contrat salarié . cotisations . maladie sur les revenus de remplacement": {
    "formule": {
      "produit": {
        "assiette": "rémunération . revenus de remplacement",
        "taux": {
          "variations": [
            {
              "si": "établissement . localisation . département = 'Mayotte'",
              "alors": "2.35%"
            },
            {
              "si": "régime alsace moselle",
              "alors": "1.5%"
            },
            {
              "sinon": "0%"
            }
          ]
        }
      }
    }
  },
  "contrat salarié . aides employeur": {
    "titre": "aides employeur",
    "résumé": "Pour l'employeur, différées dans le temps",
    "description": "Ces aides sont appelées différées, car elles ne consistent pas en une simple réduction des cotisations mensuelles : elles interviendront a posteriori par exemple sous la forme d’un crédit d'impôt.\n\nLe simulateur n'intègre pas toutes les innombrables aides disponibles en France. Découvrez-les sur le [portail officiel](http://www.aides-entreprises.fr).\n",
    "formule": {
      "somme": [
        "aides à l'embauche",
        "activité partielle . indemnisation entreprise"
      ]
    }
  },
  "contrat salarié . aides employeur . aides à l'embauche": {
    "description": "L'État met en place des aides pour encourager l'embauche de certains publics prioritaires. Ces aides sont non cumulables entre elles.\n",
    "formule": {
      "le maximum de": [
        "aide à l'embauche d'apprentis",
        "aide exceptionnelle à l'embauche d'apprentis",
        "aide exceptionnelle à l'embauche des jeunes",
        "aide à l'embauche senior professionnalisation",
        "aide à l'embauche des travailleurs handicapés",
        "emploi franc"
      ]
    }
  },
  "contrat salarié . aides employeur . aide à l'embauche d'apprentis": {
    "description": "Depuis 2019 une aide à l'embauche unique remplace quatre précédents dispositifs. Le montant de l'aide dépend de l'ancienneté du contrat.\n\nUne fois les démarches d'enregistrement effectuées, l'aide est versée automatiquement tous les mois.\n",
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . effectif < 250",
        "apprentissage",
        "apprentissage . diplôme préparé . niveau bac ou moins"
      ]
    },
    "formule": {
      "variations": [
        {
          "si": "apprentissage . ancienneté = 'moins d'un an'",
          "alors": "4125 €/an"
        },
        {
          "si": "apprentissage . ancienneté = 'moins de deux ans'",
          "alors": "2000 €/an"
        },
        {
          "sinon": "1200 €/an"
        }
      ]
    },
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23556"
    }
  },
  "contrat salarié . aides employeur . aide exceptionnelle à l'embauche d'apprentis": {
    "description": "Dans le cadre du plan de relance de l'économie de la rentrée 2020, le gouvernement met en place une aide exceptionnelle au recrutement des apprentis.\nCette aide est ouverte pour les contrats signés entre le 1er juillet 2020 et le 28 février 2021. Elle se substitue à l’aide unique, dont bénéficient les entreprises de moins de 250 salariés embauchant un apprenti de niveau CAP à Bac.",
    "applicable si": {
      "toutes ces conditions": [
        {
          "une de ces conditions": [
            "apprentissage",
            "professionnalisation . jeune de moins de 30 ans"
          ]
        },
        "ancienneté . date d'embauche >= 01/07/2020",
        "ancienneté . date d'embauche <= 31/12/2021",
        "temps de travail . temps effectif > 0 heures/mois"
      ]
    },
    "formule": {
      "variations": [
        {
          "si": "salarié majeur",
          "alors": "8000 €/an"
        },
        {
          "sinon": "5000 €/an"
        }
      ]
    },
    "rend non applicable": "aide à l'embauche d'apprentis",
    "références": {
      "Plan \\#1jeune1solution": "https://travail-emploi.gouv.fr/formation-professionnelle/entreprise-et-alternance/aide-exceptionnelle-apprentissage"
    }
  },
  "contrat salarié . jeune de moins de 26 ans": {
    "question": "Le salarié a-t-il moins de 26 ans ?",
    "par défaut": "non"
  },
  "contrat salarié . aides employeur . aide exceptionnelle à l'embauche des jeunes": {
    "non applicable si": "aides employeur . emploi franc",
    "description": "Dans le cadre du plan de relance de l'économie de la rentrée 2020, le gouvernement met en place une aide exceptionnelle au recrutement des jeunes de moins de 26 ans.\nL’aide est de 4 000 euros sur un an pour un salarié à temps plein. Ce montant est proratisé en fonction du temps de travail et de la durée du contrat de travail.",
    "applicable si": {
      "toutes ces conditions": [
        "ancienneté . date d'embauche >= 01/08/2020",
        "ancienneté . date d'embauche <= 31/05/2021",
        "rémunération . brut de base <= 2 * SMIC",
        {
          "une de ces conditions": [
            "CDI",
            {
              "toutes ces conditions": [
                "CDD",
                "CDD . durée contrat >= 3 mois"
              ]
            }
          ]
        },
        "jeune de moins de 26 ans"
      ]
    },
    "rend non applicable": [
      "aide à l'embauche des travailleurs handicapés"
    ],
    "formule": {
      "produit": {
        "assiette": "4000 €/an",
        "facteur": "temps de travail . quotité de travail effective"
      },
      "arrondi": "oui"
    },
    "références": {
      "Plan \\#1jeune1solution": "https://travail-emploi.gouv.fr/le-ministere-en-action/relance-activite/plan-1jeune-1solution/aide-embauche-jeunes"
    }
  },
  "contrat salarié . aides employeur . aide à l'embauche senior professionnalisation": {
    "description": "Les employeurs peuvent obtenir une aide de 2000 € pour l'embauche d'un\ndemandeur d'emploi de plus de 45 ans en contrat de professionnalisation.\n",
    "applicable si": "professionnalisation . salarié de 45 ans et plus",
    "formule": {
      "produit": {
        "assiette": "2000 €/an",
        "facteur": "temps de travail . quotité de travail effective"
      },
      "arrondi": "oui"
    },
    "références": {
      "Ministère du travail": "https://travail-emploi.gouv.fr/emploi/mesures-seniors/article/l-aide-a-l-embauche-d-un-demandeur-d-emploi-de-45-ans-et-plus-en-contrat-de",
      "Pôle Emploi": "https://www.pole-emploi.fr/employeur/aides-aux-recrutements/les-aides-a-lembauche/embauche-de-de-de-45-ans-et-plus.html"
    }
  },
  "contrat salarié . aides employeur . emploi franc": {
    "description": "Aide différée versée par Pôle emploi pour l'embauche d'un demandeur d'emploi\ninscrit à Pôle Emploi et résidant dans un quartier prioritaire de la ville\n(QPV).\n\n- *embauche en CDI* : 5000€/an pendant 3 ans, soit un total de 15 000€\n- *embauche en CDD d'au moins 6 mois* : 2 500€/an pendant 2 ans, soit 5 000€ au maximum\n\n[🗺 Vérifier l'éligibilité d'une adresse](https://sig.ville.gouv.fr/recherche-adresses-qp-polville)\n",
    "applicable si": "éligible",
    "formule": {
      "multiplication": {
        "assiette": {
          "variations": [
            {
              "si": {
                "toutes ces conditions": [
                  "ancienneté . date d'embauche >= 15/10/2020",
                  "ancienneté . date d'embauche <= 31/05/2021",
                  "jeune de moins de 26 ans"
                ]
              },
              "alors": {
                "nom": "emploi franc plus",
                "variations": [
                  {
                    "si": "CDD",
                    "alors": "5500 €/an"
                  },
                  {
                    "sinon": "7000 €/an"
                  }
                ]
              }
            },
            {
              "sinon": {
                "variations": [
                  {
                    "si": "CDD",
                    "alors": "2500 €/an"
                  },
                  {
                    "sinon": "5000 €/an"
                  }
                ]
              }
            }
          ]
        },
        "facteur": "temps de travail . quotité de travail effective"
      },
      "arrondi": "oui"
    },
    "rend non applicable": [
      "aide à l'embauche des travailleurs handicapés"
    ],
    "références": {
      "Fiche emploi franc": "https://travail-emploi.gouv.fr/emploi/emplois-francs/article/embaucher-une-personne-en-emploi-franc"
    }
  },
  "contrat salarié . aides employeur . emploi franc . éligible": {
    "titre": "éligibilité à l'aide emploi franc",
    "applicable si": {
      "une de ces conditions": [
        "CDI",
        {
          "toutes ces conditions": [
            "CDD",
            "CDD . durée contrat >= 6"
          ]
        }
      ]
    },
    "question": "Cette embauche est-elle éligible à l'aide emploi-franc ?",
    "description": "Conditions :\n- Le salarié recruté est un demandeur d'emploi inscrit à Pôle Emploi et réside dans un quartier prioritaire de la ville (QPV) [vérifier l'éligibilité d'un quartier](https://sig.ville.gouv.fr/recherche-adresses-qp-polville)\n- L'employeur est à jour de ses cotisations et n'a pas procédé à un licenciement économique pour le poste pourvu dans les 6 mois précédents le recrutement\n- Le salarié recruté ne doit pas avoir appartenu à l'effectif de l'entreprise dans les 6 mois précédent l'embauche\n",
    "par défaut": "non"
  },
  "contrat salarié . temps de travail": {
    "unité": "heures/mois",
    "formule": {
      "somme": [
        "temps contractuel",
        "heures supplémentaires",
        "heures complémentaires"
      ]
    },
    "description": "En France, la base légale du travail est de 35h/semaine. Mais un grand nombre de dispositions existantes permettent de faire varier ce nombre. Vous pouvez les retrouver sur la page [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/N458) dédiée."
  },
  "contrat salarié . aides employeur . aide à l'embauche des travailleurs handicapés": {
    "non applicable si": "aides employeur . emploi franc",
    "description": "Dans le cadre du plan de relance, le gouvernement a décidé de créer une aide à l’embauche visant à favoriser l’emploi des personnes en situation de handicap quel que soit leur âge.",
    "applicable si": {
      "toutes ces conditions": [
        {
          "nom": "situation de handicap",
          "question": "Le salarié a-t'il la reconnaissance de travailleur handicapé (RQTH) ?",
          "par défaut": "non"
        },
        "ancienneté . date d'embauche >= 01/09/2020",
        "ancienneté . date d'embauche <= 30/06/2021",
        "rémunération . brut de base <= 2 * SMIC",
        {
          "une de ces conditions": [
            "CDI",
            {
              "toutes ces conditions": [
                "CDD",
                "CDD . durée contrat >= 3 mois"
              ]
            }
          ]
        }
      ]
    },
    "formule": {
      "produit": {
        "assiette": "4000 €/an",
        "facteur": "temps de travail . quotité de travail effective"
      },
      "arrondi": "oui"
    },
    "références": {
      "Plan \\#1jeune1solution": "https://travail-emploi.gouv.fr/le-ministere-en-action/relance-activite/plan-1jeune-1solution/aide-embauche-jeunes"
    }
  },
  "contrat salarié . temps de travail . temps effectif": {
    "formule": {
      "somme": [
        "temps de travail",
        "(- activité partielle . heures chômées)"
      ]
    }
  },
  "contrat salarié . temps de travail . temps contractuel": {
    "unité": "heures/mois",
    "formule": {
      "produit": {
        "assiette": "temps hebdomadaire",
        "facteur": "période . semaines par mois"
      }
    }
  },
  "contrat salarié . temps de travail . temps contractuel . temps hebdomadaire": {
    "unité": "heures/semaine",
    "formule": {
      "variations": [
        {
          "si": "temps partiel",
          "alors": "temps partiel . heures par semaine"
        },
        {
          "sinon": "base légale"
        }
      ]
    }
  },
  "contrat salarié . temps de travail . base légale": {
    "formule": "35 heures/semaine"
  },
  "contrat salarié . temps de travail . temps partiel": {
    "question": "Le contrat est-il à temps partiel ?",
    "description": "Deux contrats au même salaire, l'un à temps partiel, l'autre à temps complet, peuvent donner lieu à des montants de cotisation différents.\n\nPar exemple pour les cotisations plafonnées ou les exonérations dépendant du SMIC.\n",
    "par défaut": "non"
  },
  "contrat salarié . temps de travail . temps partiel . heures par semaine": {
    "par défaut": "32 heures/semaine",
    "question": "Quel est le nombre d'heures travaillées par semaine dans le cadre du temps partiel ?",
    "suggestions": {
      "4 jours / semaine": "base légale * 4 / 5",
      "mi-temps": "base légale / 2"
    }
  },
  "contrat salarié . temps de travail . temps partiel . contrôle temps min": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "heures par semaine < 24 heures/semaine",
    "description": "Le nombre minimum d'heures par semaine est 24. Il est possible de descendre plus bas dans certains cas seulement. [Plus d'infos](https://www.service-public.fr/particuliers/vosdroits/F32428)."
  },
  "contrat salarié . temps de travail . temps partiel . contrôle temps max": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "heures par semaine >= base légale",
    "description": "Un temps partiel doit être en dessous de la durée de travail légale (35h)"
  },
  "contrat salarié . temps de travail . quotité de travail": {
    "description": "Temps de travail en proportion du temps complet légal.",
    "formule": {
      "valeur": "temps de travail / (base légale * période . semaines par mois)",
      "plafond": "100%"
    },
    "unité": "%"
  },
  "contrat salarié . temps de travail . quotité de travail effective": {
    "description": "Le plafond de la sécurité sociale doit être pro-ratisé en retirant les absences ainsi que les jours passés au chômage partiel.",
    "formule": "temps de travail . temps effectif / (base légale * période . semaines par mois)"
  },
  "contrat salarié . temps de travail . heures supplémentaires": {
    "description": "Toute heure de travail accomplie, à la demande de l'employeur, au-delà de la durée légale de 35 heures (ou de la durée équivalente) est une heure supplémentaire. Les heures supplémentaires ouvrent droit à une rémunération plus favorable (taux horaire majoré) au salarié.",
    "titre": "Nombre d'heures supplémentaires",
    "non applicable si": "temps partiel",
    "question": "Combien d'heures supplémentaires (non récupérées en repos) sont effectuées par mois ?",
    "par défaut": "0 heure/mois",
    "suggestions": {
      "aucune": "0 heure/mois",
      "39h / semaine": "17.33 heures/mois",
      "42h / semaine": "30.33 heures/mois"
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F2391"
    }
  },
  "contrat salarié . temps de travail . contrôle 44h max": {
    "type": "notification",
    "formule": {
      "toutes ces conditions": [
        "heures supplémentaires > 9 heures/semaine * période . semaines par mois",
        "heures supplémentaires <= 13 heures/semaine * période . semaines par mois"
      ]
    },
    "description": "La durée hebdomadaire moyenne de travail ne peut pas dépasser 44h"
  },
  "contrat salarié . temps de travail . contrôle 48h max": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "heures supplémentaires > 13 heures/semaine * période . semaines par mois",
    "description": "La durée hebdomadaire maximale de travail ne peut pas dépasser 48h"
  },
  "contrat salarié . temps de travail . heures supplémentaires . majoration": {
    "description": "La rémunération des heures supplémentaires fait l'objet d'un ou plusieurs taux de majoration, fixés par convention ou accord collectif d'entreprise ou d'établissement (ou, à défaut, par convention ou accord de branche). Chaque taux est au minimum fixé à 10%.\n\nÀ défaut d'accord ou de convention, les taux de majoration horaire sont fixés à :\n- 25 % pour les 8 premières heures supplémentaires travaillées dans la même semaine (de la 36e à la 43e heure),\n- 50 % pour les heures suivantes.\n",
    "titre": "majoration heures supplémentaires",
    "note": "Pour l'instant, nous implémentons uniquement les taux standards et ceux de la convention HCR (Hôtel café restaurant). Si vous dépendez d'une convention avec des taux spécifiques, merci de nous le signaler à `contact@mon-entreprise.beta.gouv.fr`",
    "unité": "heure/mois",
    "formule": {
      "barème": {
        "assiette": "heures supplémentaires",
        "multiplicateur": "période . semaines par mois",
        "tranches": [
          {
            "taux": "25%",
            "plafond": "8 heures/semaine"
          },
          {
            "taux": "50%"
          }
        ]
      }
    }
  },
  "contrat salarié . temps de travail . heures complémentaires": {
    "description": "Les heures complémentaires sont les heures effectuées par un salarié à temps partiel au delà de son horaire contractuel. Les heures complémentaires ne doivent pas amener le salarié à travailler pour une durée supérieur à la durée légale ou conventionnelle du travail.\n",
    "applicable si": "temps partiel",
    "question": "Combien d'heures complémentaires (non récupérées en repos) sont effectuées par mois ?",
    "par défaut": "0 heure/mois"
  },
  "contrat salarié . temps de travail . contrôle heures complémentaires 10 pourcents": {
    "type": "notification",
    "formule": "heures complémentaires > heures complémentaires . seuil légal",
    "description": "Sauf disposition conventionnelle, le nombre d'heures complémentaires ne peut être supérieur à un dixième de la durée contractuelle du temps partiel."
  },
  "contrat salarié . temps de travail . contrôle heures complémentaires max": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "heures complémentaires + temps partiel . heures par semaine * période . semaines par mois >= base légale * période . semaines par mois",
    "description": "Les heures complémentaires ne doivent pas amener le salarié à travailler pour une durée supérieure ou égale à la durée légale du travail (35h)"
  },
  "contrat salarié . temps de travail . heures complémentaires . majoration": {
    "description": "La rémunération des heures complémentaire fait l'objet d'un ou plusieurs taux de majoration, fixés par convention ou accord collectif d'entreprise ou d'établissement (ou, à défaut, par convention ou accord de branche). Chaque taux est au minimum fixé à 10%.\nÀ défaut d'accord ou de convention, les taux de majoration horaire sont fixés à : - 10 % pour les heures effectuées dans la limite d'un dixième de la durée contractuelle - 25 % pour les heures suivantes.\n",
    "titre": "majoration heures complémentaires",
    "note": "Nous n'implémentons pas les taux conventionnels",
    "formule": {
      "barème": {
        "assiette": "heures complémentaires",
        "mutliplicateur": null,
        "tranches": [
          {
            "taux": "10%",
            "plafond": "seuil légal"
          },
          {
            "taux": "25%"
          }
        ]
      }
    }
  },
  "contrat salarié . temps de travail . heures complémentaires . seuil légal": {
    "description": "Sauf disposition conventionnelle, le nombre d'heures complémentaires ne peut être supérieur à un dixième de la durée contractuelle du temps partiel.\nSi la convention le permet, les heures complémentaire au delà de ce seuil sont rémunérée avec une majoration de 25%",
    "unité": "heures/mois",
    "formule": {
      "produit": {
        "assiette": "temps partiel . heures par semaine",
        "taux": "10%",
        "facteur": "période . semaines par mois"
      },
      "arrondi": "0 décimales"
    }
  },
  "contrat salarié . statut JEI": {
    "titre": "Statut JEI",
    "question": "La personne bénéficie-t-elle de l'exonération Jeune Entreprise Innovante (JEI) ?",
    "description": "Le statut de jeune entreprise innovante (JEI) a été créé par la loi de finances pour 2004 et permet aux PME de moins de 8 ans consacrant 15% au moins de leurs charges à de la Recherche et Développement de bénéficier d'une exonération de cotisations sociales.\n\nL’exonération peut s’appliquer sur les rémunérations versées :\n- aux salariés pour lesquels l’employeur est soumis à l’obligation d’assurance chômage\n- aux mandataires sociaux qui participent, à titre principal, au projet de recherche et de développement de l’entreprise\n\nPar simplification, le bénéfice de l’exonération au titre d’un salarié sera considéré comme acquis dès lors que la moitié de son temps de travail au moins est consacrée à un ou des projets de recherche et de développement et l’exonération ne pourra être remise en cause.",
    "par défaut": "non",
    "rend non applicable": [
      "réduction générale",
      "allocations familiales . taux réduit",
      "contrat salarié . maladie . taux employeur . taux réduit",
      "lodeom"
    ]
  },
  "contrat salarié . statut JEI . exonération de cotisations": {
    "titre": "Exonération JEI",
    "aide": {
      "type": "réduction de cotisations",
      "démarches": "non"
    },
    "description": "Exonération pour les jeunes entreprises innovantes (JEI).\n",
    "références": {
      "description": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31188",
      "calcul": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-ou-aides-liees-au-s/jeunes-entreprises-innovantes/quelle-exoneration.html",
      "cumuls": "https://www.legisocial.fr/actualites-sociales/2068-comment-declarer-les-cotisations-dallocations-familiales-si-lentreprise-beneficie-du-regime-jei.html"
    },
    "unité": "€/mois",
    "formule": {
      "somme": [
        "allocations familiales",
        "maladie . employeur",
        "vieillesse . employeur"
      ],
      "plafond": {
        "recalcul": {
          "avec": {
            "rémunération . brut de base": "4.5 * SMIC"
          }
        }
      }
    }
  },
  "contrat salarié . réduction générale": {
    "description": "Dans le cadre du pacte de responsabilité et de solidarité, le dispositif zéro cotisation Urssaf permet à l'employeur d'un salarié au Smic de ne plus payer aucune cotisation. Le montant de l'allègement est égal au produit de la rémunération annuelle brute par un coefficient. Il n'y a pas de formalité particulière à effectuer.\n",
    "références": {
      "description": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F24542",
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale.html",
      "calcul": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction.html",
      "cumuls": "https://www.legisocial.fr/actualites-sociales/2068-comment-declarer-les-cotisations-dallocations-familiales-si-lentreprise-beneficie-du-regime-jei.html"
    },
    "non applicable si": "cotisations . assiette forfaitaire . montant",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "facteur": "coefficient"
      },
      "plafond": "plafond avec application de la DFS"
    },
    "exemples": [
      {
        "nom": "Maximale dans le cas d'un SMIC",
        "situation": {
          "rémunération . brut": 1521.22
        },
        "valeur attendue": 487.55
      },
      {
        "nom": "Salaire proche du SMIC",
        "situation": {
          "rémunération . brut": 1530
        },
        "valeur attendue": 490.37
      },
      {
        "nom": "Résiduelle pour un salaire médian",
        "situation": {
          "rémunération . brut": 2300
        },
        "valeur attendue": 87.1
      },
      {
        "nom": "Nulle au-dessus du plafond",
        "situation": {
          "rémunération . brut": 2464
        },
        "valeur attendue": 0
      }
    ]
  },
  "contrat salarié . réduction générale . coefficient": {
    "formule": {
      "produit": {
        "assiette": "SMIC / cotisations . assiette * 1.6 - 1",
        "facteur": "T / 0.6"
      },
      "plancher": "0%",
      "plafond": "T",
      "arrondi": "4 décimales"
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction/etape-1--determination-du-coeffi.html",
      "Code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000025103779&cidTexte=LEGITEXT000006073189"
    }
  },
  "contrat salarié . réduction générale . T": {
    "titre": "Coefficient T",
    "unité": "",
    "formule": {
      "somme": [
        "T sécurité sociale et chômage",
        {
          "valeur": "retraite complémentaire . employeur . taux tranche 1",
          "plafond": "4.72%"
        },
        {
          "valeur": "contribution d'équilibre général . employeur . taux tranche 1",
          "plafond": "1.29%"
        }
      ]
    }
  },
  "contrat salarié . réduction générale . T sécurité sociale et chômage": {
    "unité": "",
    "formule": {
      "somme": [
        "maladie . taux employeur",
        "allocations familiales . taux",
        "vieillesse . employeur . déplafonnée . taux",
        "vieillesse . employeur . plafonnée . taux",
        "maladie . taux solidarité autonomie",
        "ATMP . taux minimum",
        "FNAL . taux",
        "chômage . employeur . taux"
      ]
    }
  },
  "contrat salarié . réduction générale . imputation sécurité sociale": {
    "formule": {
      "produit": {
        "assiette": "réduction générale",
        "facteur": "T sécurité sociale et chômage / T"
      }
    }
  },
  "contrat salarié . réduction générale . imputation retraite complémentaire": {
    "formule": "réduction générale - imputation sécurité sociale"
  },
  "contrat salarié . réduction générale . plafond avec application de la DFS": {
    "applicable si": "déduction forfaitaire spécifique > 0",
    "unité": "€/mois",
    "formule": {
      "produit": {
        "taux": "130%",
        "assiette": {
          "recalcul": {
            "règle": "réduction générale",
            "avec": {
              "déduction forfaitaire spécifique": "non"
            }
          }
        }
      }
    }
  },
  "contrat salarié . contribution d'équilibre général": {
    "description": "Cette cotisation créée en 2019 permet à la fois de compenser les charges résultant des départs à la retraite avant 67 ans et d’honorer les engagements retraite des personnes qui ont cotisé à la GMP, une ancienne cotisation de compensation pour les cadres.",
    "acronyme": "CEG",
    "cotisation": {
      "branche": "retraite",
      "type de retraite": "complémentaire",
      "destinataire": "AGIRC-ARRCO"
    },
    "formule": {
      "barème": {
        "assiette": "cotisations . assiette",
        "multiplicateur": "plafond sécurité sociale",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "tranches": [
              {
                "taux [ref taux tranche 1]": "1.29%",
                "plafond": 1
              },
              {
                "taux": "1.62%",
                "plafond": 8
              }
            ]
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "assiette": "cotisations . assiette . salariale",
            "tranches": [
              {
                "taux": "0.86%",
                "plafond": 1
              },
              {
                "taux": "1.08%",
                "plafond": 8
              }
            ]
          }
        ]
      }
    },
    "références": {
      "calcul des cotisations": "https://www.agirc-arrco.fr/ce-qui-change-au-1er-janvier-2019/vous-etes-une-entreprise-tiers-declarant/"
    }
  },
  "contrat salarié . contribution d'équilibre technique": {
    "acronyme": "CET",
    "cotisation": {
      "branche": "retraite",
      "type de retraite": "complémentaire",
      "destinataire": "AGIRC-ARRCO"
    },
    "applicable si": "cotisations . assiette > plafond sécurité sociale",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "plafond": "8 * plafond sécurité sociale",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "taux [ref]": "0.21%"
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "taux": "0.14%"
          }
        ]
      }
    },
    "références": {
      "calcul des cotisations": "https://www.agirc-arrco.fr/ce-qui-change-au-1er-janvier-2019/vous-etes-une-entreprise-tiers-declarant/"
    }
  },
  "contrat salarié . retraite complémentaire": {
    "cotisation": {
      "branche": "retraite",
      "type de retraite": "complémentaire",
      "destinataire": "AGIRC-ARRCO"
    },
    "description": "Cotisations de retraite complémentaire.\n",
    "formule": {
      "barème": {
        "assiette": "cotisations . assiette",
        "multiplicateur": "plafond sécurité sociale",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "tranches": [
              {
                "taux [ref taux tranche 1]": "4.72%",
                "plafond": 1
              },
              {
                "taux [ref taux tranche 2]": "12.95%",
                "plafond": 8
              }
            ]
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "assiette": "cotisations . assiette . salariale",
            "tranches": [
              {
                "taux [ref taux tranche 1]": "3.15%",
                "plafond": 1
              },
              {
                "taux [ref taux tranche 2]": "8.64%",
                "plafond": 8
              }
            ]
          }
        ]
      }
    },
    "références": {
      "calcul des cotisations": "https://www.agirc-arrco.fr/ce-qui-change-au-1er-janvier-2019/vous-etes-une-entreprise-tiers-declarant/",
      "régime des impatriés": "https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=D2C4F8F0A5E19693ADF9F440120B748A.tplgfr31s_2?idArticle=JORFARTI000038496272&cidTexte=JORFTEXT000038496102&dateTexte=29990101&categorieLien=id"
    }
  },
  "contrat salarié . retraite supplémentaire": {
    "formule": {
      "somme": [
        {
          "nom": "employeur",
          "valeur": "0€/mois"
        },
        {
          "nom": "salarié",
          "valeur": "0€/mois"
        }
      ]
    }
  },
  "contrat salarié . retraite supplémentaire . part déductible": {
    "formule": {
      "valeur": "retraite supplémentaire . employeur",
      "abattement": "plafond d'exonération sociale employeur"
    }
  },
  "contrat salarié . retraite supplémentaire . plafond d'exonération sociale employeur": {
    "formule": {
      "valeur": "5% * rémunération . brut",
      "plafond": "5% * plafond sécurité sociale"
    },
    "références": {
      "Article D242-1": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000037456320&cidTexte=LEGITEXT000006073189&dateTexte=20180930"
    }
  },
  "contrat salarié . retraite supplémentaire . exonération fiscale": {
    "titre": "retraite supplémentaire exonérée d'impôt",
    "formule": {
      "valeur": "retraite supplémentaire",
      "plafond": {
        "produit": {
          "assiette": "rémunération . brut",
          "plafond": "8 * plafond sécurité sociale temps plein",
          "taux": "8%"
        }
      }
    },
    "références": {
      "Bopfip § 120": "https://bofip.impots.gouv.fr/bofip/5956-PGP.html"
    }
  },
  "contrat salarié . AGS": {
    "description": "Cotisation au Régime de Garantie des Salaires",
    "cotisation": {
      "dû par": "employeur",
      "branche": "assurance chômage"
    },
    "references": {
      "calcul": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31409"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.15%",
        "plafond": "4 * plafond sécurité sociale"
      }
    }
  },
  "contrat salarié . allocations familiales": {
    "cotisation": {
      "dû par": "employeur",
      "branche": "famille"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux [ref]": {
          "variations": [
            {
              "si": "taux réduit",
              "alors": "3.45%"
            },
            {
              "sinon": "5.25%"
            }
          ]
        }
      }
    },
    "références": {
      "calcul": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-cotisation-dallocations-famil.html"
    }
  },
  "contrat salarié . allocations familiales . taux réduit": {
    "formule": "cotisations . assiette < plafond de réduction"
  },
  "contrat salarié . allocations familiales . taux réduit . plafond de réduction": {
    "titre": "Plafond de la réduction des allocations familiales",
    "formule": "SMIC * 3.5"
  },
  "contrat salarié . APEC": {
    "cotisation": {
      "branche": "assurance chômage",
      "type de retraite": "complémentaire",
      "destinataire": "APEC"
    },
    "description": "Cotisation chômage complémentaire cadre, pour le fonctionnement de l'APEC\n(Association Pour l’Emploi des Cadres)\n",
    "références": {
      "chiffres clés": "http://www.agirc-arrco.fr/l-agirc-et-larrco/chiffres-cles"
    },
    "applicable si": "statut cadre",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "plafond": "4 * plafond sécurité sociale",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "taux": "0.036%"
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "taux": "0.024%"
          }
        ]
      }
    }
  },
  "contrat salarié . chômage": {
    "cotisation": {
      "branche": "assurance chômage",
      "destinataire": "Pôle emploi",
      "dû par": "employeur"
    },
    "description": "Cotisation d’assurance chômage",
    "références": {
      "calcul": "http://www.pole-emploi.fr/employeur/taux-des-contributions-de-l-assurance-chomage-et-cotisations-ags-@/article.jspz?id=61567",
      "urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/lassurance-chomage-et-lags/les-taux.html",
      "changements 2017": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/contributions-patronales-dassura.html"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "plafond": "4 * plafond sécurité sociale",
        "composantes": [
          {
            "attributs": {
              "nom": "salarié"
            },
            "taux [ref]": "0%"
          },
          {
            "attributs": {
              "nom": "employeur"
            },
            "taux [ref]": "4.05%"
          }
        ]
      }
    },
    "exemples": [
      {
        "nom": "SMIC",
        "situation": {
          "cotisations . assiette": 1500
        },
        "valeur attendue": 60.75
      },
      {
        "nom": "Haut salaire",
        "situation": {
          "cotisations . assiette": 20000
        },
        "valeur attendue": 555.34
      }
    ]
  },
  "contrat salarié . complémentaire santé": {
    "description": "L'Assurance maladie (Sécurité sociale) ne rembourse pas complètement vos dépenses de santé.\n\nLa complémentaire santé d'entreprise complète ces remboursements, en totalité ou en partie.\n\nEn plus de la complémentaire santé, le dispositif collectif de l'entreprise peut proposer d'autres garanties (garanties décès, garantie dépendance, etc.).\n",
    "cotisation": {
      "branche": "santé"
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F20739"
    },
    "formule": {
      "produit": {
        "assiette": "forfait",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "taux": "part employeur"
          },
          {
            "attributs": {
              "nom": "salarié"
            },
            "taux": "part salarié"
          }
        ]
      }
    },
    "exemples": [
      {
        "nom": "forfait à 40€",
        "situation": {
          "forfait": 40
        },
        "valeur attendue": 40
      },
      {
        "nom": "forfait à 100€ payé par l'employeur",
        "situation": {
          "forfait": 100,
          "part employeur": 100
        },
        "valeur attendue": 100
      }
    ]
  },
  "contrat salarié . complémentaire santé . part employeur": {
    "description": "Part de la complémentaire santé payée par l'employeur. Doit être de 50% minimum",
    "question": "Quelle est la part de la complémentaire santé payée par l'employeur ?",
    "suggestions": {
      "50%": "50%",
      "100%": "100%"
    },
    "par défaut": "50%"
  },
  "contrat salarié . complémentaire santé . part employeur min": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "part employeur < 50%",
    "description": "La part employeur de la complémentaire santé doit être de 50% au minimum"
  },
  "contrat salarié . complémentaire santé . part salarié": {
    "description": "Part de la complémentaire santé payée par l'employé. Ne peut pas être supérieure à 50%",
    "formule": "100% - part employeur"
  },
  "contrat salarié . complémentaire santé . forfait": {
    "titre": "Forfait de complémentaire santé entreprise",
    "description": "L'employeur a l'obligation de proposer une offre de complémentaire santé. Il doit prendre à sa charge au moins la moitié de son coût.\nLe montant peut varier, mais la prévoyance doit couvrir un panier minimum légal de soins.",
    "note": "Pour des raisons historiques, la couverture sociale santé des salariés d'Alsace-Moselle est plus forte. En conséquence, le prix des forfaits de complémentaire santé qui leur sont proposés sont inférieurs. Une étude de Meilleureassurance.com nous permet de supposer qu'il vaut en moyenne ~ 70% du prix moyen en France.",
    "références": {
      "les obligations de l'employeur": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33754",
      "Alsace-moselle étude Meilleureassurance.com": "http://www.lefigaro.fr/conjoncture/2018/10/16/20002-20181016ARTFIG00248-les-tarifs-des-complementaires-sante-font-le-grand-ecart-d-un-departement-a-l-autre.php"
    },
    "question": "Quel est le montant mensuel total (salarié et employeur) de la complémentaire santé entreprise ?",
    "par défaut": "40 €/mois",
    "suggestions": {
      "basique": "40 €/mois",
      "élevé": "100 €/mois",
      "alsace moselle basique": "30 €/mois"
    }
  },
  "contrat salarié . complémentaire santé . contrôle min": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "complémentaire santé . forfait < 15 €/mois",
    "description": "Vérifiez bien qu'une complémentaire santé si peu chère couvre le panier de soin minimal défini dans la loi."
  },
  "contrat salarié . régime alsace moselle": {
    "titre": "Régime Alsace-Moselle",
    "description": "Nous considérons qu'un salarié est affilié au régime Alsace-Moselle quand l'établissement dans lequel il travaille est situé dans ces départements.\n\nAttention : c'est une **simplification** : l'affiliation est plus compliquée que celà, voir les conditions exactes [sur le site du régime](http://regime-local.fr/salaries/).\n",
    "formule": {
      "une de ces conditions": [
        "établissement . localisation . département = 'Bas-Rhin'",
        "établissement . localisation . département = 'Haut-Rhin'",
        "établissement . localisation . département = 'Moselle'"
      ]
    }
  },
  "contrat salarié . contribution au dialogue social": {
    "cotisation": {
      "dû par": "employeur",
      "collecteur": "Urssaf"
    },
    "description": "Contribution patronale destinée à abonder un fonds paritaire dédié au financement des organisations syndicales et des organisations professionnelles d’employeurs.\n\nAnciennement 'contribution patronale au financement des organisations syndicales'\n",
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-contribution-patronale-au-dia.html",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33308"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.016%"
      }
    }
  },
  "contrat salarié . CSG et CRDS": {
    "cotisation": {
      "dû par": "salarié",
      "collecteur": "Urssaf"
    },
    "description": "La CSG et la CRDS sont dues par tous les salariés remplissant les deux conditions suivantes :\n- ils sont domiciliés fiscalement en France, - ils sont à la charge d’un régime français d’assurance maladie obligatoire.\nSi l’un des deux critères n’est pas rempli, la CSG et la CRDS ne sont pas dues, à la condition d’en apporter la preuve (justificatif fiscal ou carte d’assuré social).",
    "formule": {
      "somme": [
        "CSG",
        "CRDS"
      ]
    }
  },
  "contrat salarié . CSG et CRDS . assiette de base": {
    "références": {
      "calcul": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-csg-crds/les-revenus-salariaux-soumis-a-l.html",
      "abattement": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-csg-crds/abattement-et-deductions/les-revenus-exclus-de-labattemen.html",
      "heures supplémentaires": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    },
    "formule": {
      "somme": [
        "assiette abattue totale",
        "avantages sociaux",
        "(- assiette heures supplémentaires et complémentaires défiscalisées)"
      ]
    }
  },
  "contrat salarié . CSG et CRDS . assiette abattue totale": {
    "formule": {
      "barème": {
        "assiette": "cotisations . assiette",
        "multiplicateur": "plafond sécurité sociale",
        "tranches": [
          {
            "taux": "98.25%",
            "plafond": 4
          },
          {
            "taux": "100%"
          }
        ]
      }
    }
  },
  "contrat salarié . CSG et CRDS . assiette revenu remplacements": {
    "formule": {
      "produit": {
        "taux": "98.25%",
        "assiette": "rémunération . revenus de remplacement"
      }
    }
  },
  "contrat salarié . CSG et CRDS . assiette heures supplémentaires et complémentaires défiscalisées": {
    "formule": {
      "produit": {
        "assiette": "rémunération . net imposable . heures supplémentaires et complémentaires défiscalisées",
        "taux": "98.25%"
      }
    },
    "références": {
      "DSN": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    }
  },
  "contrat salarié . CSG et CRDS . non déductible": {
    "titre": "CSG non déductible et CRDS",
    "formule": {
      "somme": [
        "CSG . non déductible",
        "CRDS",
        "revenus de remplacement . CSG non déductible",
        "revenus de remplacement . CRDS"
      ]
    }
  },
  "contrat salarié . CSG et CRDS . CSG": {
    "non applicable si": "établissement . localisation . département = 'Mayotte'",
    "description": "La contribution sociale généralisée (CSG) est un impôt destiné à participer au financement de la protection sociale.\nA la différence des cotisations sociales qui ne portent que sur les revenus d’activité, la CSG concerne, outre les revenus d’activité et de remplacement (allocations chômage, indemnités journalières…), les revenus du patrimoine, les produits de placement ou les sommes engagées ou redistribuées par les jeux.\nElle est prélevée à la source sur la plupart des revenus. Elle est recouvrée par les Urssaf sur les revenus d’activité et par l’administration fiscale sur les revenus du patrimoine.\nLe produit de la CSG est reversé à la Cnam et à la Cnaf, il finance également le fonds de solidarité vieillesse",
    "formule": {
      "multiplication": {
        "assiette": "assiette de base",
        "composantes": [
          {
            "attributs": {
              "nom": "déductible"
            },
            "taux": {
              "nom": "taux",
              "valeur": "6.8%"
            }
          },
          {
            "attributs": {
              "nom": "non déductible"
            },
            "composantes": [
              {
                "taux": {
                  "nom": "taux",
                  "valeur": "2.4%"
                }
              },
              {
                "attributs": {
                  "nom": "heures supplémentaires et complémentaires défiscalisées"
                },
                "assiette": "assiette heures supplémentaires et complémentaires défiscalisées",
                "taux": "déductible . taux + non déductible . taux"
              }
            ]
          }
        ]
      }
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/assiette-csg-crds.html",
      "heures supplémentaires": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    },
    "exemples": [
      {
        "nom": "CSG cadre",
        "situation": {
          "cotisations . assiette": 1500,
          "complémentaire santé . forfait": 40,
          "statut cadre": "oui"
        },
        "valeur attendue": 139.495
      },
      {
        "nom": "CSG non cadre",
        "situation": {
          "cotisations . assiette": 1500,
          "complémentaire santé . forfait": 40
        },
        "valeur attendue": 137.425
      }
    ]
  },
  "contrat salarié . CSG et CRDS . CRDS": {
    "cotisation": {
      "impôt": "oui",
      "dû par": "salarié"
    },
    "description": "Contribution pour le remboursement de la dette sociale",
    "formule": {
      "produit": {
        "assiette": {
          "somme": [
            "assiette de base",
            "assiette heures supplémentaires et complémentaires défiscalisées"
          ]
        },
        "taux": {
          "nom": "taux",
          "valeur": "0.5%"
        }
      }
    }
  },
  "contrat salarié . CSG et CRDS . revenus de remplacement": {
    "titre": "CSG et CRDS revenus de remplacement",
    "description": "La CSG et CRDS prélevées sur les revenus de remplacement.",
    "note": "Le prélèvement de la CSG et de la CRDS ne peut pas avoir pour effet de réduire le montant de la rémunération d’activité et des allocations de chômage à un seuil inférieur au Smic brut.",
    "formule": {
      "somme": [
        "revenus de remplacement . CSG déductible",
        "revenus de remplacement . CSG non déductible",
        "revenus de remplacement . CRDS"
      ]
    }
  },
  "contrat salarié . CSG et CRDS . revenus de remplacement . CSG déductible": {
    "titre": "CSG déductible revenus de remplacement",
    "produit": {
      "assiette": "CSG et CRDS . assiette revenu remplacements",
      "taux": "3.8%"
    },
    "plafond [ref]": {
      "somme": [
        "rémunération . net de cotisations",
        "rémunération . revenus de remplacement",
        "(- SMIC temps plein)"
      ],
      "plancher": "0€/mois"
    },
    "note": null
  },
  "contrat salarié . CSG et CRDS . revenus de remplacement . CSG non déductible": {
    "titre": "CSG non déductible revenus de remplacement",
    "produit": {
      "assiette": "CSG et CRDS . assiette revenu remplacements",
      "taux": "CSG . non déductible . taux"
    },
    "plafond [ref]": {
      "valeur": "CSG déductible . plafond - CSG déductible"
    }
  },
  "contrat salarié . CSG et CRDS . revenus de remplacement . CRDS": {
    "titre": "CRDS revenus de remplacement",
    "produit": {
      "assiette": "assiette revenu remplacements",
      "taux": "CRDS . taux"
    },
    "plafond": {
      "valeur": "CSG non déductible . plafond - CSG non déductible"
    }
  },
  "contrat salarié . FNAL": {
    "titre": "Contribution au Fonds National d’Aide au Logement",
    "description": "Le fonds national d’aide au logement (Fnal) est une contribution qui assure le financement de l’allocation logement.\n",
    "cotisation": {
      "dû par": "employeur",
      "destinataire": "Urssaf",
      "branche": "famille"
    },
    "références": {
      "calcul": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-contribution-au-fonds-nationa.html"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux [ref]": {
          "variations": [
            {
              "si": "éligible taux réduit",
              "alors": "0.1%"
            },
            {
              "sinon": "0.5%"
            }
          ]
        },
        "plafond": {
          "applicable si": "éligible taux réduit",
          "valeur": "plafond sécurité sociale"
        }
      }
    },
    "exemples": [
      {
        "nom": "SMIC",
        "situation": {
          "cotisations . assiette": 1500,
          "entreprise . effectif": 10
        },
        "valeur attendue": 1.5
      }
    ]
  },
  "contrat salarié . FNAL . éligible taux réduit": {
    "formule": "entreprise . effectif < 50"
  },
  "contrat salarié . formation professionnelle": {
    "cotisation": {
      "dû par": "employeur",
      "collecteur": "OPCO",
      "branche": "formation"
    },
    "description": "Cette contribution obligatoire est collectée par l'OPCO (opérateurs de compétences) désigné par la branche conventionnelle de l'entreprise, ou à défaut à un OPCO interprofessionnel.",
    "note": "Une part supplémentaire peut-être obligatoire en fonction des accords collectifs d'une entreprise.\n\n> Par exemple pour la convention collective Syntec, un supplément de 0.025% est obligatoire.\n\nLe taux est porté à 1,3 % pour les entreprises de travail temporaire. Par ailleurs en cas de franchissement du seuil d'effectifs de 10 salariés, des taux spécifiques s'appliquent afin de limiter la hausse de la contribution à la formation professionnelle :\n\n- taux de **0,55 %** pour le franchissement en année **N, N+1 et N+2**\n- taux de **0,70 %** pour le franchissement en année **N+3**  (1,3 % pour les entreprises de travail temporaire)\n- taux de **0,90 %** pour le franchissement en année **N+4** (1,3 % pour les entreprises de travail temporaire)\n- taux de **1 %** pour le franchissement en année **N+5** (1,3 % pour les entreprises de travail temporaire)\n",
    "non applicable si": {
      "toutes ces conditions": [
        "entreprise . effectif < 11",
        "apprentissage"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "variations": [
          {
            "si": "entreprise . effectif < 11",
            "alors": {
              "taux": "0.55%"
            }
          },
          {
            "sinon": {
              "taux": "1%"
            }
          }
        ]
      }
    },
    "références": {
      "fiche Ministère du travail": "https://travail-emploi.gouv.fr/formation-professionnelle/entreprises-et-formation/article/participation-financiere-des-entreprises-au-developpement-de-la-formation",
      "Bercy infos": "https://www.economie.gouv.fr/entreprises/contribution-formation-professionnelle",
      "Taux réduit": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000037387044&cidTexte=LEGITEXT000006072050&dateTexte=20190101"
    }
  },
  "contrat salarié . maladie": {
    "cotisation": {
      "branche": "santé"
    },
    "description": "Cotisations de la branche maladie",
    "références": {
      "fiche": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-cotisation-maladie---maternit.html",
      "Décret n° 2017-1891 relatif au taux des cotisations d'assurance maladie": "https://www.legifrance.gouv.fr/eli/decret/2017/12/30/CPAS1732212D/jo/texte",
      "Réduction 2019": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/une-reduction-des-cotisations-pa.html"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "composantes": [
          {
            "attributs": {
              "nom": "employeur"
            },
            "composantes": [
              {
                "attributs": {
                  "titre": "maladie, maternité, invalidité, décès",
                  "nom": "base"
                },
                "taux": "taux employeur"
              },
              {
                "attributs": {
                  "nom": "contribution solidarité autonomie"
                },
                "taux": "taux solidarité autonomie"
              }
            ]
          },
          {
            "attributs": {
              "nom": "salarié",
              "titre": "maladie, maternité, invalidité, décès salarié"
            },
            "taux": "taux salarié"
          }
        ]
      }
    }
  },
  "contrat salarié . maladie . taux solidarité autonomie": {
    "acronyme": "CSA",
    "formule": "0.3%",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-contribution-solidarite-auton.html",
      "Fiche service-public": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32872"
    }
  },
  "contrat salarié . maladie . taux employeur": {
    "formule": {
      "variations": [
        {
          "si": "taux réduit",
          "alors": "7%"
        },
        {
          "sinon": "13%"
        }
      ]
    }
  },
  "contrat salarié . maladie . taux employeur . taux réduit": {
    "formule": "cotisations . assiette < plafond de réduction employeur"
  },
  "contrat salarié . maladie . taux salarié": {
    "formule": {
      "variations": [
        {
          "si": "régime alsace moselle",
          "alors": "1.5%"
        },
        {
          "sinon": "0%"
        }
      ]
    }
  },
  "contrat salarié . maladie . plafond de réduction employeur": {
    "formule": "2.5 * SMIC"
  },
  "contrat salarié . participation effort de construction": {
    "titre": "Participation à l'effort de construction",
    "alias": "Dispositif du 1% logement",
    "acronyme": "PEEC",
    "description": "Participation des employeurs à l'effort de construction",
    "cotisation": {
      "branche": "logement",
      "dû par": "employeur",
      "impôt": "oui"
    },
    "références": {
      "fiche": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22583"
    },
    "note": "L'employeur a le choix entre verser cet impôt à un \"organisme du 1% patronal\" agréé, investir la somme dans le logement de ses salariés, ou accorder à eux et leur famille des prêts de construction à taux réduit.\n",
    "non applicable si": "entreprise . effectif < 50",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.45%"
      }
    }
  },
  "contrat salarié . prévoyance": {
    "formule": {
      "somme": [
        {
          "nom": "employeur",
          "formule": "0 €/mois"
        },
        {
          "nom": "salarié",
          "formule": "0 €/mois"
        }
      ]
    }
  },
  "contrat salarié . prévoyance . part déductible": {
    "formule": {
      "valeur": "prévoyance . employeur",
      "abattement": "plafond exonération sociale employeur"
    }
  },
  "contrat salarié . prévoyance . plafond exonération sociale employeur": {
    "formule": {
      "somme": [
        "6% * plafond sécurité sociale",
        "1.5% * rémunération . brut"
      ],
      "plafond": "12% * plafond sécurité sociale"
    }
  },
  "contrat salarié . prévoyance obligatoire cadre": {
    "titre": "Prévoyance obligatoire pour les cadres",
    "cotisation": {
      "dû par": "employeur",
      "branche": "santé"
    },
    "références": {
      "minimum": "http://www.axios.fr/150-tranche-a-evitez-une-erreur-a-160-000-euros"
    },
    "applicable si": "statut cadre",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "plafond": "plafond sécurité sociale",
        "taux": "1.5%"
      }
    }
  },
  "contrat salarié . prévoyance . exonération fiscale": {
    "titre": "prévoyance exonérée d'impôt",
    "formule": {
      "valeur": "prévoyance",
      "plafond": {
        "somme": [
          "5% * plafond sécurité sociale temps plein",
          "2% * rémunération . brut"
        ],
        "plafond": "2% * 8 * plafond sécurité sociale temps plein"
      }
    },
    "références": {
      "Bopfip § 120": "https://bofip.impots.gouv.fr/bofip/5956-PGP.html"
    }
  },
  "contrat salarié . taxe d'apprentissage": {
    "cotisation": {
      "destinataire": "Opérateurs de compétences (OPCO)",
      "branche": "formation",
      "dû par": "employeur"
    },
    "description": "La taxe d'apprentissage permet de financer par les entreprises les dépenses de l'apprentissage et des formations technologiques et professionnelles",
    "applicable si": {
      "une de ces conditions": [
        "entreprise . effectif > 10",
        "apprentissage = non"
      ]
    },
    "références": {
      "description": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22574",
      "csa": "http://www.opcalia.com/employeurs/financer-la-formation-et-lapprentissage/taxe-dapprentissage/contribution-supplementaire-a-lapprentissage-csa/"
    },
    "note": "Taxe complexe, comportant notamment des exonérations non prises en compte ici.",
    "formule": {
      "somme": [
        "base",
        "contribution supplémentaire"
      ]
    }
  },
  "contrat salarié . taxe d'apprentissage . assiette": {
    "titre": "assiette de la taxe d'apprentissage",
    "description": "Le salaire des apprentis est partiellement exonéré dans la base de calcul de la taxe d'apprentissage.",
    "formule": {
      "variations": [
        {
          "si": "apprentissage",
          "alors": {
            "valeur": "cotisations . assiette",
            "abattement": {
              "variations": [
                {
                  "si": "établissement . localisation . outre-mer",
                  "alors": "20% * SMIC"
                },
                {
                  "sinon": "11% * SMIC"
                }
              ]
            }
          }
        },
        {
          "sinon": "cotisations . assiette"
        }
      ]
    }
  },
  "contrat salarié . taxe d'apprentissage . base": {
    "titre": "taxe d'apprentissage de base",
    "formule": {
      "produit": {
        "assiette": "assiette",
        "taux": {
          "variations": [
            {
              "si": "régime alsace moselle",
              "alors": "0.44%"
            },
            {
              "sinon": "0.68%"
            }
          ]
        }
      }
    }
  },
  "contrat salarié . taxe d'apprentissage . contribution supplémentaire": {
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . effectif >= 250",
        "entreprise . ratio alternants < 5%"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "assiette",
        "variations": [
          {
            "si": "taxe d'apprentissage . csa au taux majoré",
            "alors": {
              "taux": "0.6%"
            }
          },
          {
            "si": "entreprise . ratio alternants < 1%",
            "alors": {
              "taux": "0.4%"
            }
          },
          {
            "si": "entreprise . ratio alternants < 2%",
            "alors": {
              "taux": "0.2%"
            }
          },
          {
            "si": "entreprise . ratio alternants < 3%",
            "alors": {
              "taux": "0.1%"
            }
          },
          {
            "si": "entreprise . ratio alternants < 5%",
            "alors": {
              "taux": "0.05%"
            }
          }
        ]
      }
    }
  },
  "contrat salarié . taxe d'apprentissage . csa au taux majoré": {
    "titre": "CSA au taux majoré",
    "formule": {
      "toutes ces conditions": [
        "entreprise . effectif >= 2000",
        "entreprise . ratio alternants < 1%"
      ]
    }
  },
  "contrat salarié . taxe sur les salaires . assiette de base": {
    "formule": {
      "somme": [
        "cotisations . assiette",
        "avantages sociaux"
      ]
    },
    "références": {
      "assiette": "http://bofip.impots.gouv.fr/bofip/6690-PGP.html"
    }
  },
  "contrat salarié . taxe sur les salaires . assiette": {
    "formule": {
      "valeur": "assiette de base",
      "abattement": "prime d'impatriation"
    },
    "références": {
      "bofig": "http://bofip.impots.gouv.fr/bofip/6691-PGP.html",
      "impots.gouv.fr": "https://www.impots.gouv.fr/portail/international-particulier/le-regime-des-impatries"
    }
  },
  "contrat salarié . taxe sur les salaires . barème": {
    "unité": "€/an",
    "formule": {
      "barème": {
        "assiette": "assiette",
        "tranches": [
          {
            "taux": "4.25%",
            "plafond": "8004 €/an"
          },
          {
            "taux": "8.5%",
            "plafond": "15981 €/an"
          },
          {
            "taux": "13.6%"
          }
        ]
      }
    },
    "exemples": [
      {
        "nom": "salaire médian",
        "situation": {
          "contrat salarié . taxe sur les salaires": "oui",
          "assiette": 2300
        },
        "valeur attendue": 2598.4
      }
    ],
    "note": "Nous n'implémentons pas les taux spécifiques pour l'outre-mer\n",
    "références": {
      "barème": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22576"
    }
  },
  "contrat salarié . régime des impatriés": {
    "question": "Le salarié bénéficie-t-il du régime des impatriés ?",
    "non applicable si": "situation personnelle . domiciliation fiscale à l'étranger",
    "par défaut": "non",
    "description": "Si vous êtes salarié ou dirigeant fiscalement assimilé, et si vous avez été appelé par une entreprise étrangère à occuper un emploi dans une entreprise établie en France ayant un lien avec la première ou si vous avez été directement recruté à l’étranger par une entreprise établie en France, vous pouvez bénéficier du régime des impatriés.\n\nVous devez en outre ne pas avoir été fiscalement domicilié en France les cinq années civiles précédant celle de la prise de fonctions et fixer en France votre domicile fiscal dès votre prise de fonctions.\n\nLes impatriés sont exonérés de cotisations retraite (régime de base et complémentaire) à condition de justifier d'une contribution minimale versée par ailleurs (par exemple dans une caisse de retraite ou un fond de pension étranger). Ils n’acquièrent aucun droit pendant la durée d’exonération.\n",
    "note": "La durée d’application est fixée au maximum jusqu’au 31 décembre de la huitième année civile suivant la prise de fonctions dans l’entreprise d’accueil.",
    "rend non applicable": [
      "vieillesse",
      "retraite complémentaire",
      "protection sociale . retraite . base"
    ],
    "références": {
      "impots.gouv.fr": "https://www.impots.gouv.fr/portail/particulier/questions/puis-je-beneficier-du-regime-des-impatries",
      "bofip": "http://bofip.impots.gouv.fr/bofip/5694-PGP",
      "Article 155B du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069577&idArticle=LEGIARTI000006307476&dateTexte=&categorieLien=cid"
    }
  },
  "contrat salarié . régime des impatriés . information": {
    "type": "notification",
    "formule": "oui",
    "description": "Pour bénéficier de l'exonération de cotisations vieillesse, il faut remplir les conditions suivantes : - Pouvoir justifier d'une contribution minimale versée ailleurs pour une assurance vieillesse - Ne pas avoir été affilié, au cours des cinq années civiles précédant celle de la prise de fonctions, à un régime français obligatoire d'assurance vieillesse, sauf pour des activités accessoires, de caractère saisonnier ou pour les études.\n[Lire le texte de loi](https://www.legifrance.gouv.fr/affichCode.do;jsessionid=F5CFB7C90D1D1F529A2CDC9FFD20BD6E.tplgfr34s_3?idSectionTA=LEGISCTA000038510929&cidTexte=LEGITEXT000006073189&dateTexte=20190626)"
  },
  "contrat salarié . taxe sur les salaires": {
    "unité": "€/mois",
    "taxe": {
      "dû par": "employeur"
    },
    "description": "La taxe sur les salaires en France est un impôt progressif créé en 1948 que certains employeurs doivent acquitter sur les salaires qu'ils distribuent.",
    "applicable si": "entreprise . taxe sur les salaires",
    "formule": "entreprise . taxe sur les salaires * 1 employé / entreprise . effectif",
    "note": "Nous supposons ici que tous les salariés de l'entreprise ont la même rémunération\nCette implémentation de la taxe sur les salaires est spécifique aux associations à but non lucratif, elle est donc largement simplifiée. Plein d'autres organisations sont concernées, en fonction de la TVA qu'elles paient. Les associations y sont assujetties automatiquement.\n",
    "exemples": [
      {
        "nom": "non applicable par défaut",
        "situation": {
          "rémunération . brut de base": 2300
        },
        "valeur attendue": false
      },
      {
        "nom": "association non lucrative unipersonnelle",
        "situation": {
          "entreprise . association non lucrative": "oui",
          "rémunération . brut de base": 2300,
          "entreprise . effectif": 1
        },
        "valeur attendue": 0
      },
      {
        "nom": "association non lucrative",
        "situation": {
          "entreprise . association non lucrative": "oui",
          "rémunération . brut de base": 2300,
          "entreprise . effectif": 10,
          "complémentaire santé . forfait": 0
        },
        "valeur attendue": 41.17
      }
    ],
    "références": {
      "fiche": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22576"
    }
  },
  "contrat salarié . versement transport": {
    "description": "Contribution sur les salaires destinée au financement des transports publics.",
    "applicable si": "entreprise . effectif > 10",
    "cotisation": {
      "branche": "transport",
      "dû par": "employeur"
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "établissement . taux du versement transport"
      }
    },
    "références": {
      "wikipedia": "https://fr.wikipedia.org/wiki/Versement_transport"
    }
  },
  "contrat salarié . vieillesse": {
    "cotisation": {
      "branche": "retraite",
      "collecteur": "Urssaf",
      "destinataire": "CNAV"
    },
    "description": "Cotisation au régime de retraite de base des salariés.",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "composantes": [
          {
            "attributs": {
              "nom": "salarié"
            },
            "assiette": "cotisations . assiette . salariale",
            "composantes": [
              {
                "attributs": {
                  "nom": "déplafonnée"
                },
                "taux [ref]": "0.4%"
              },
              {
                "attributs": {
                  "nom": "plafonnée"
                },
                "taux [ref]": "6.90%",
                "plafond": "plafond sécurité sociale"
              }
            ]
          },
          {
            "attributs": {
              "nom": "employeur"
            },
            "composantes": [
              {
                "attributs": {
                  "nom": "déplafonnée"
                },
                "taux [ref]": "1.9%"
              },
              {
                "attributs": {
                  "nom": "plafonnée"
                },
                "taux [ref]": "8.55%",
                "plafond": "plafond sécurité sociale"
              }
            ]
          }
        ]
      }
    },
    "exemples": [
      {
        "nom": "SMIC",
        "situation": {
          "cotisations . assiette": 1500
        },
        "valeur attendue": 266.25
      },
      {
        "nom": "Salaire élevé",
        "situation": {
          "cotisations . assiette": 8000
        },
        "valeur attendue": 713.63
      }
    ],
    "références": {
      "Article L727-2 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCode.do;jsessionid=F5CFB7C90D1D1F529A2CDC9FFD20BD6E.tplgfr34s_3?idSectionTA=LEGISCTA000038510929&cidTexte=LEGITEXT000006073189&dateTexte=20190626"
    }
  },
  "contrat salarié . forfait social": {
    "titre": "Forfait social",
    "description": "Le forfait social est une contribution versée par l'employeur. Elle est prélevée sur les rémunérations ou gains non soumis aux cotisations et contributions sociales, mais assujettis à la CSG.\n",
    "applicable si": "entreprise . effectif > 10",
    "cotisation": {
      "branche": "retraite",
      "collecteur": "Urssaf",
      "destinataire": "CNAV",
      "dû par": "employeur"
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/le-forfait-social.html",
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31532",
      "Code du travail - Article L137-15": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000019950196&cidTexte=LEGITEXT000006073189"
    },
    "formule": {
      "produit": {
        "assiette": "avantages sociaux",
        "taux": "8%"
      }
    }
  },
  "contrat salarié . maladie . taux domiciliation fiscale étranger": {
    "titre": "taux salarié (domiciliation fiscale à l'étranger)",
    "applicable si": "situation personnelle . domiciliation fiscale à l'étranger",
    "remplace": "taux salarié",
    "formule": "5.50%"
  },
  "contrat salarié . lodeom": {
    "valeur": "oui",
    "description": "Un ensemble assez complexe de réductions de cotisation est disponible pour les salariés d'outre-mer.\nLeur fonctionnement est similaire à celui de la réduction générale sur les bas salaires : pour un certain salaire donné, 100% de réduction.\nPour un autre salaire plus élevé, 0% de réduction. Entre les deux, on trace une ligne droite.\n"
  },
  "contrat salarié . lodeom . zone un": {
    "titre": "Zone géographique 1 (Guadeloupe, Martinique, La Réunion, Guyane)",
    "références": {
      "fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe.html"
    },
    "formule": {
      "une de ces conditions": [
        "établissement . localisation . département = 'Guadeloupe'",
        "établissement . localisation . département = 'La Réunion'",
        "établissement . localisation . département = 'Martinique'",
        "établissement . localisation . département = 'Guyane'"
      ]
    }
  },
  "contrat salarié . lodeom . réduction outre-mer": {
    "aide": {
      "type": "réduction de cotisations",
      "thème": "aide bas salaires",
      "démarches": "non"
    },
    "applicable si": {
      "toutes ces conditions": [
        "cotisations . assiette <= plafond de l'assiette",
        "zone un",
        {
          "une de ces conditions": [
            "éligible barème compétitivité",
            "éligible barème compétitivité renforcée",
            "éligible barème innovation et croissance"
          ]
        }
      ]
    },
    "formule": {
      "somme": [
        "allocations familiales",
        "FNAL",
        "maladie . employeur",
        "vieillesse . employeur",
        {
          "produit": {
            "assiette": "cotisations . assiette",
            "taux": "ATMP . taux minimum"
          }
        },
        "retraite complémentaire . employeur",
        "contribution d'équilibre général . employeur",
        "chômage . employeur"
      ],
      "plafond": {
        "variations": [
          {
            "si": {
              "toutes ces conditions": [
                "éligible barème innovation et croissance",
                "cotisations . assiette > borne inférieure * SMIC",
                "cotisations . assiette < 2.5 * SMIC"
              ]
            },
            "alors": "1.7 * paramètre T * SMIC"
          },
          {
            "si": {
              "toutes ces conditions": [
                "éligible barème innovation et croissance",
                "cotisations . assiette > 2.5 * SMIC"
              ]
            },
            "alors": "((borne inférieure * paramètre T) / (borne supérieure - 2.5)) *  écart au plafond de l'assiette"
          },
          {
            "sinon": "multiplicateur * écart au plafond de l'assiette"
          }
        ]
      }
    },
    "note": "Nous utilisons la méthode de calcul officielle de la sécurité sociale. Il serait préférable ici de réduire directement les cotisations concernées, ce qui éviterait au calcul de reposer sur les paramètres `T` publiés chaque année (ils dépendent directement des cotisaitons réduites).",
    "références": {
      "Estimateur Urssaf": "https://www.urssaf.fr/portail/home/utile-et-pratique/estimateur-exoneration-lodeom.html?ut="
    }
  },
  "contrat salarié . lodeom . plafond de l'assiette": {
    "formule": "borne supérieure * SMIC"
  },
  "contrat salarié . lodeom . écart au plafond de l'assiette": {
    "formule": "plafond de l'assiette - cotisations . assiette"
  },
  "contrat salarié . lodeom . éligible barème compétitivité": {
    "titre": "Eligibilité au barème de compétitivité",
    "applicable si": {
      "toutes ces conditions": [
        "zone un",
        {
          "une de ces conditions": [
            "entreprise . effectif < 11",
            "secteurs d'activité"
          ]
        }
      ]
    },
    "rend non applicable": [
      "réduction générale"
    ],
    "formule": "oui",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe/bareme-dit-de-competitivite.html"
    }
  },
  "contrat salarié . lodeom . secteurs d'activité": {
    "applicable si": "zone un",
    "question": "Votre entreprise appartient-elle à l'un des secteurs éligible LODEOM ?",
    "description": "Pour être éligible au 1er barème de l'exonération LODEOM, dit barème de compétitivité, votre entreprise doit appartenir à l'un des secteurs suivants :\n\n- ✈ transport aérien assurant les liaisons entre les départements et régions d’Outre-mer et entre la métropole et ces territoires, ainsi que les dessertes intérieures\n- ⛵ dessertes maritimes, fluviales ou les liaisons entre départements et régions d’Outre-mer\n- 🏗 bâtiment et travaux publics\n- 📰 la presse\n- 🎥 la production audiovisuelle\n- les secteurs éligibles aux régimes de compétitivité renforcée (barème 2) ou d’innovation et de croissance (barème 3), qui ne respectent pas les conditions d’effectifs (moins de 250 salariés) ou de chiffres d’affaires annuel (moins de 50 millions d’euros).\n",
    "par défaut": "non"
  },
  "contrat salarié . lodeom . éligible barème compétitivité renforcée": {
    "applicable si": "zone un",
    "rend non applicable": [
      "réduction générale",
      "éligible barème compétitivité"
    ],
    "question": "Êtes-vous éligibles au barème compétitivité renforcée ?",
    "description": "- Chiffre d'affaires de moins de 50 millions d'euros\n- Les employeurs relevant des secteurs de l’industrie, de la restauration, de l’environnement, de l’agro nutrition, des énergies renouvelables, des nouvelles technologies de l’information et de la communication et des centres d’appel, de la pêche, des cultures marines, de l’aquaculture, de l’agriculture, du tourisme y compris les activités de loisirs s’y rapportant, du nautisme, de l’hôtellerie, de la recherche et du développement ;\n- Les entreprises bénéficiaires du régime de perfectionnement actif défini à l’article 256 du règlement (UE) n° 952/2013 du parlement européen et du conseil du 9 octobre 2013 établissant le code des douanes de l’Union\n- En Guyane, les employeurs ayant une activité principale relevant de l’un des secteurs d’activité éligibles à la réduction d’impôt prévue à l’article 199 undecies B du code général des impôts, ou correspondant à l’une des activités suivantes : comptabilité, conseil aux entreprises, ingénierie ou études techniques.\n",
    "par défaut": "non",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe/bareme-dit-de-competitivite-renf.html"
    }
  },
  "contrat salarié . lodeom . éligible barème innovation et croissance": {
    "applicable si": "zone un",
    "rend non applicable": [
      "réduction générale",
      "éligible barème compétitivité",
      "éligible barème compétitivité renforcée"
    ],
    "question": "Êtes-vous éligibles au barème innovation et croissance ?",
    "description": "- Sont éligibles à ce barème les employeurs occupant moins de 250 salariés et ayant réalisé un chiffre d’affaires annuel inférieur à 50 millions d’euros, au titre de la rémunération des salariés concourant essentiellement à la réalisation de projets innovants dans le domaine des technologies de l’information et de la communication.\n- Les projets innovants se définissent comme des projets ayant pour but l’introduction d’un bien, d’un service, d’une méthode de production ou de distribution nouveau ou sensiblement amélioré sur le plan des caractéristiques et de l’usage auquel il est destiné. Ces projets doivent être réalisés dans les domaines suivants :\n  - 📱 télécommunication ;\n  - informatique, dont notamment programmation, conseil en systèmes et logiciels, tierce maintenance de systèmes et d’applications, gestion d‘installations, traitement des données, hébergement et activités connexes ;\n  - édition de portails internet et de logiciels;\n  - infographie, notamment conception de contenus visuels et numériques ;\n  - conception d’objets connectés.\n- Si ces conditions sont réunies, l’exonération s’applique aux rémunérations versées aux salariés occupés principalement à la réalisation de projets innovants.\n- Sont donc exclues les fonctions supports : tâches administratives financières, logistiques et de ressources humaines.\n",
    "par défaut": "non",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe/bareme-dit-innovation-et-croissa.html"
    }
  },
  "contrat salarié . lodeom . borne inférieure": {
    "formule": {
      "variations": [
        {
          "si": "éligible barème compétitivité",
          "alors": "130%"
        },
        {
          "sinon": "170%"
        }
      ]
    }
  },
  "contrat salarié . lodeom . borne supérieure": {
    "unité": "",
    "formule": {
      "variations": [
        {
          "si": "éligible barème compétitivité",
          "alors": "220%"
        },
        {
          "si": "éligible barème compétitivité renforcée",
          "alors": "270%"
        },
        {
          "si": "éligible barème innovation et croissance",
          "alors": "350%"
        }
      ]
    }
  },
  "contrat salarié . lodeom . multiplicateur": {
    "note": "pour le barème 1 le dénominateur vaut 0,9",
    "formule": "(borne inférieure * paramètre T) / (borne supérieure - borne inférieure)"
  },
  "contrat salarié . lodeom . paramètre T": {
    "unité": "",
    "formule": {
      "variations": [
        {
          "si": {
            "toutes ces conditions": [
              "zone un",
              "entreprise . effectif < 20"
            ]
          },
          "alors": 0.3214
        },
        {
          "si": {
            "toutes ces conditions": [
              "zone un",
              "entreprise . effectif >= 20"
            ]
          },
          "alors": 0.3254
        }
      ]
    },
    "note": "La valeur du paramètre `T` dépend du taux FNAL. Une meilleur implémentation consiste à calculer ce paramètre comme une somme de taux."
  },
  "contrat salarié . cotisations . assiette forfaitaire": {
    "formule": "non"
  },
  "contrat salarié . cotisations . assiette forfaitaire . montant": {
    "titre": "assiette forfaitaire de cotisations",
    "non applicable si": "rémunération réelle",
    "remplace": [
      {
        "règle": "cotisations . assiette",
        "sauf dans": [
          "chômage",
          "retraite complémentaire",
          "contribution d'équilibre général",
          "contribution d'équilibre technique",
          "convention collective",
          "assiette . salariale"
        ]
      },
      {
        "règle": "assiette . salariale",
        "dans": "vieillesse"
      },
      {
        "règle": "CSG et CRDS . assiette abattue totale"
      },
      {
        "règle": "plafond sécurité sociale",
        "par": "plafond sécurité sociale temps plein",
        "sauf dans": [
          "chômage",
          "retraite complémentaire",
          "contribution d'équilibre général",
          "contribution d'équilibre technique",
          "convention collective",
          "assiette . salariale"
        ]
      }
    ],
    "formule": {
      "valeur": "assiette forfaitaire",
      "plancher": "minimum"
    },
    "références": {
      "exception agirc-arco (fiche 3)": "https://www.agirc-arrco.fr/fileadmin/agircarrco/documents/circulaires/agirc_arrco/2019/2019-1-DRJ_Reglementation__applicable_aux_entreprises.pdf",
      "CSG et CRDS": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/assiette-csg-crds.html",
      "plafond de sécurité sociale (urssaf.fr)": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/lassiette-maximale/salarie-a-temps-partiel.html#FilAriane"
    }
  },
  "contrat salarié . cotisations . assiette forfaitaire . minimum": {
    "description": "Il existe une règle générale d'encadrement des assiettes forfaitaires. Lorsque la rémunération est supérieure ou égale à\n  1,5 fois le plafond de la sécurité sociale, l'assiette forfaitaire retenue ne peut être inférieure à 70% de la rémunération\n",
    "applicable si": "rémunération . brut >= 1.5 * plafond sécurité sociale temps plein",
    "formule": "70% * rémunération . brut"
  },
  "contrat salarié . cotisations . assiette forfaitaire . rémunération réelle": {
    "question": "Voulez-vous calculer les cotisations sur la rémunération réelle (au lieu de la base forfaitaire) ?",
    "par défaut": "non"
  },
  "contrat salarié . convention collective": {
    "par défaut": "'droit commun'",
    "question": "Quelle convention collective est applicable à l'entreprise ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "droit commun",
          "HCR",
          "BTP",
          "sport",
          "SVP",
          "compta",
          "optique"
        ]
      }
    }
  },
  "contrat salarié . convention collective . contrôle décharge": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "convention collective != 'droit commun'",
    "description": "Attention : l'implémentation des conventions collective est encore partielle et non vérifiée. Néanmoins, cela permet d'obtenir une première estimation, plus précise que le régime général."
  },
  "contrat salarié . convention collective . droit commun": {
    "formule": "convention collective = 'droit commun'"
  },
  "situation personnelle": "oui",
  "situation personnelle . RSA": {
    "titre": "bénéficiaire RSA ou prime d'activité",
    "question": "Etes-vous bénéficiaire du RSA ou de la prime d’activité ?",
    "par défaut": "non"
  },
  "situation personnelle . domiciliation fiscale à l'étranger": {
    "description": "Ces assurés ne sont pas redevables de la CSG/CRDS ni de l'impôt sur le revenu.",
    "question": "La résidence fiscale de la personne est-elle située à l'étranger ?",
    "rend non applicable": [
      "dirigeant . indépendant . cotisations et contributions . CSG et CRDS",
      "contrat salarié . CSG et CRDS"
    ],
    "par défaut": "non",
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-csg-crds/qui-en-est-redevable.html"
    }
  }
}
