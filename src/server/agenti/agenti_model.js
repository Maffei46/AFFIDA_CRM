'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    ruolo:{
        type: String,
        required: true,
        enum: ["Agente","Dipendente","Demo"],
    },
    figura:{
        type: String,
        required: true,
        enum: ["Head Executive","Top Executive","Executive","Team Leader","Personal Broker","Specialist","Dipendente","Demo"]
    },
    gruppo:{
        reteCommerciale:{
            type: Boolean,
            default: false,
        },
        diretti:{
            type: Boolean,
            default: false,
        },
        manager:{
            type: Boolean,
            default: false,
        },
        unici:{
            type: Boolean,
            default: false,
        },
        dipendenti:{
            type: Boolean,
            default: false,
        },
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    sesso:{
        type: String,
        enum:['M','F','A'],
        default: 'A'
    },
    nome: {
        type: String,
        required: true,
        trim: true
    },
    cognome: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    rapporto: {
        type: String,
        enum: ["attivo","non attivo"],
        default: "attivo",
    },

    provincia:{
        type: String,
        required: false,
    },
    regione:{
        type: String,
        required: false,
    },
    indirizzo:{
        type: String,
        required: false,
    },
    civico:{
        type: String,
        required: false,
    },
    cap:{
        type: String,
        required: false,
    },
    comune:{
        type: String,
        required: false,
    },

    cellulare:{
        type: String,
        required: false,
    },
    codiceFiscale:{
        type: String,
        required: false,
    },
    compleanno:{
        giorno: {type: Number},
        mese: {type: Number},
        anno: {type: Number},
    },
    dataDiNascita:{
        type: Date,
        required: false,
    },
    urlPhoto:{
        type: String,
        default:'https://filesgenerazione.s3.eu-west-3.amazonaws.com/empty-profile.png',
    },
    percMutui:{
        type: String,
        default:'0'
    },
    percCDQ:{
        type: String,
        default:'0'
    },
    percMediazioni:{
        type: String,
        default:'0'
    },
    percMediazioneAziende:{
        type: String,
        default:'0'
    },
    percAziende:{
        type: String,
        default:'0'
    },
    percTFS:{
        type: String,
        default:'0'
    },
    perProvPrestiti:{
        type: String,
        default:'0'
    },
    oam:{
        type: Date,
    },

    //Figure Piramidali
    topExecutive:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
    },
    executive:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
    },
    teamLeader:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
    },
    headExecutive:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
    },
    //Utenti Gestiti
    usersMenaged:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: false,
    }],
    //Status
    status:{
        type: String,
        enum: ['pending','validated','blocked','deleted'],
        default: 'pending' 
    },
    //Social
    facebook:{
        type: String,
        default: 'https://www.facebook.com/'
    },
    instagram:{
        type: String,
        default: 'https://www.instagram.com/'
    },
    SDI:{
        type: String,
    },
    PEC:{
        type: String
    },
    showInClassifiche:{
        type: Boolean,
        default: true,
    },
    IDEGG:{
        type: String,
        required: false,
    },
    //Provvigioni
    provvigioni:{
        access:{
            type:Boolean,
            default: false
        },
        tipologie:{
            Mutuo_Immobile:{type:Boolean,default:false},
            Prestito_Personale:{type:Boolean,default:false},
            Cessione_Del_Quinto:{type:Boolean,default:false},
            Altro_Strumento_Finanziario:{type:Boolean,default:false},
            Finanziamento_Impresa:{type:Boolean,default:false},
            Leasing:{type:Boolean,default:false},
            Carta_di_Credito:{type:Boolean,default:false},
            Polizza_Banca:{type:Boolean,default:false},
        },
        source:{
            type: String,
            enum:['Le proprie','Tutti'],
            default:'Le proprie'
        },
        edit:{type:Boolean,default:false}
    },
    //Obiettivi
    obiettivi:{
        mutui: { type: Number, dafault: -1},
        cqs: { type: Number, dafault: -1},
        prestiti: { type: Number, dafault: -1},
        aziende: { type: Number, dafault: -1},
        mediazioni: { type: Number, dafault: -1},
    },
    //Tabelle
    tabelle:{
        orchidea: {type: Boolean, default:false},
        orchidea_bis: {type: Boolean, default:false},
        gardenia: {type: Boolean, default:false},
        girasole: {type: Boolean, default:false},
        web_1: {type: Boolean, default:false},
        esa: {type: Boolean, default:false},
        salary_fits: {type: Boolean, default:false},
    },
    //ADMINPORTING
    adminPortingAccess:{
        type:Boolean,
        default:false,
    }

});
module.exports = mongoose.model('Users', UsersSchema);