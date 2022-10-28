import React from 'react'
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';
import {  AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag, FiEdit } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';

export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'home',
          src: 'dashbored/home',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    { 
      title: 'Pages',
      links: [
        {
          name: 'categorie',
          src: 'dashbored/categorie',
         icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'sous Categorie',
          src:'dashbored/sousCategorie',
          icon: <IoMdContacts />,
        },
        {
          name: 'Sous sous Categorie',
          src:"dashbored/sousSousCategorie",
          icon: <RiContactsLine />,
        },
        {
          name: 'forniseur',
          src:"dashbored/forniseur",
          icon: <RiContactsLine />,
        },
        {
          name: 'marque',
          src:"dashbored/marque",
          icon: <RiContactsLine />,
        },
        {
          name:'produit',
          src:'dashbored/produit',
          icon: <RiContactsLine />,
        }
      ],
    },
   
   
  ];
  export const chatData = [
    {
      image:
        avatar2,
      message: 'Roman Joined the Team!',
      desc: 'Congratulate him',
      time: '9:08 AM',
    },
    {
      image:
        avatar3,
      message: 'New message received',
      desc: 'Salma sent you new message',
      time: '11:56 AM',
    },
    {
      image:
        avatar4,
      message: 'New Payment received',
      desc: 'Check your earnings',
      time: '4:39 AM',
    },
    {
      image:
        avatar,
      message: 'Jolly completed tasks',
      desc: 'Assign her new tasks',
      time: '1:12 AM',
    },
  ];
var url_host =  "https://ecommerce7.onrender.com"
var url_local =  "http://127.0.0.1:3006"
export const baseUrl= url_host;