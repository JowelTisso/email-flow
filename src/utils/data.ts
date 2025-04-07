export const sampleLeadListData = [
  {
    id: "8cf00168-cfae-4d23-811a-dfb944ffd79f",
    name: "Sample List (added by SalesBlink)",
    contacts_count: 4,
    emails: [
      "joweltisso@gmail.com",
      "xoveltixo@gmail.com",
      "sushant@salesblink.io",
    ],
  },
];

const POST_API_DATA = {
  time: "",
  body: "",
  subject: "",
  email: "",
};

const scheduleData = {
  date: "2025-04-06T18:30:00.000Z",
  "time-picker": "2025-04-06T04:30:00.000Z",
  timezone: "asia/calcutta",
  "from-min": "10",
  "to-min": "20",
  config: {
    Monday: {
      enabled: true,
      from: "2025-04-05T22:30:00.000Z",
      till: "2025-04-06T12:30:00.000Z",
      days: "24-48",
    },
    Tuesday: {
      days: "24-48",
    },
    Wednesday: {
      days: "24-48",
    },
    Thursday: {
      days: "24-48",
    },
    Friday: {
      days: "24-48",
    },
    Saturday: {
      days: "24-48",
    },
  },
};

const emailTemplate = {
  name: "",
  offer: "",
  subject: "",
  body: "",
};

export const initialEmailTemplates = [
  {
    name: "Signal: Job Posting Template 1",
    offer: "",
    subject: "Quick Question about Job {{job_title}}",
    body: `
    Hi {{ first_name }},

    I was checking {{company_name}} & found that you guys are looking to add {{job_title}} related expertise in your team.

    I was curious to know if you guys would consider an external agency for the same?

    We provide

    <unique value props>



    We are currently helping <client names> for the same.

    Would you like to connect and discuss the possibilities?

    {{email_signature_of_sender}}
  `,
  },
];
