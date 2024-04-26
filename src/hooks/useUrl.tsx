interface ParamUpdate {
    [paramName: string]: string | null;
}

export const useUrl = () => {
    const url = window.location.toString()

    // Verifica se o parâmetro existe na url
    const hasUrlParam = (param: string) => {
        const parsedUrl = new URL(url)
        return parsedUrl.searchParams.has(param)
    }

    // Retorna o valor de um parâmetro da url
    const getUrlParamValue = (param: string) => {
        const parsedUrl = new URL(url)
        return parsedUrl.searchParams.get(param)
    }

    /*  Atualiza os parâmetros da url.
        updateUrlParams([
            {myParam: 'myValue'},   -> Atualiza o valor
            {myParam2: null}        -> Deleta o parâmetro
        ])
    */
    function updateUrlParams(paramsToUpdate: ParamUpdate): void {
        const parsedUrl = new URL(url)

        for (const [param, newValue] of Object.entries(paramsToUpdate)) {
            if(newValue) {
                parsedUrl.searchParams.set(param, newValue)
            } else {
                parsedUrl.searchParams.delete(param)
            }
        }
        window.history.pushState({}, '', parsedUrl)
    }
    
    return {
        hasUrlParam,
        getUrlParamValue,
        updateUrlParams
    }
}
