const config = {
    devServer: {
        port: 4200
    },
    url: {
        login: `/auth/login`,
        register: `/auth/register`
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
