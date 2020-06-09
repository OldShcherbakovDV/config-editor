const config = [
  {
    id: "subject",
    name: "Лендиг для тем",
    blocks: [
        {
            id: "descriptions",
            name: "Блоки описания под основным текстом страници",
            type: "list",
            inputs: [
                {
                    id: 'title',
                    name: "Заголовок",
                },
                {
                    id: 'text',
                    name: "Текст",
                }
            ]
        },
        {
            id: "program",
            name: "Описание программы курса",
            type: "list",
            inputs: [
                {
                    id: 'title',
                    name: "Заголовок",
                },
                {
                    id: 'description',
                    name: "Полное описание(HTML)",
                }
            ]
        },
        {
            id: "thesis",
            name: "Чему научишься",
            type: "list",
            inputs: [
                {
                    id: 'text',
                    name: "Текст",
                },
            ]
        },
        {
            id: "tutors",
            name: "Преподаватели",
            type: "list",
            inputs: [
                {
                    id: 'img',
                    name: "Аватар",
                },
                {
                    id: 'name',
                    name: "Имя преподавателя",
                },
                {
                    id: 'job',
                    name: "Проффесия",
                },
                {
                    id: 'textHeading',
                    name: "Заголовок",
                },
                {
                    id: 'textBody',
                    name: "Основной текст",
                },
            ]
        },
    ]
  },
];

export default config;
