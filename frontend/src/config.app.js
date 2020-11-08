const config = {
    cookie:{
        maxAge: 3600,
        name: 'schl',
        secure: false,
        httpOnly: false
    },
    url: {
        login: `/auth/login`,
        logout: `/auth/logout`,
        register: `/auth/register`,
        profile: '/profile/',
        logs: '/logs/',
        level: '/level/'
    },
    regexps: {
        companyName: /[^A-Za-z- ']/gm,
        email: /(^[0-9A-Za-z]+([-._0-9A-Za-z]+)*)@(?:[A-Za-z0-9](?:[A-Za-z0-9-_]{0,}[A-Za-z0-9])?\.)+[A-Za-z0-9]{2,}.?$/,
        name: /[^A-Z-\s']/gm,
        notDigit: /[^0-9]/g,
        notPhoneNumber: /[^0-9,]/gmi,
        notPostCode: /[^a-z0-9]/gmi,
        notPnr: /[^A-Za-z]/g,
        requestId: /[^0-9A-Za-z-]/gm,
    },
}

export default config
