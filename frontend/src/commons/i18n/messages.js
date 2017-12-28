export default {
    'pt-BR': {
        'LABELS': {
            'AT': 'Em',
            'ALL_CATEGORIES': 'Todas',
            'ALL_POSTS': 'Todos',
            'APP_BAR_POST_LIST': '{category} posts',

            'CANCEL': 'Cancelar',
            'CATEGORY': 'Categoria',
            'COMMENT': 'Comentário',
            'COMMENT_AUTHOR': 'Autor',
            'COMMENT_AUTHOR_FORM_PLACEHOLDER': 'Digite o nome do autor do comentário',
            'COMMENT_BODY': 'Comentário',
            'COMMENT_BODY_FORM_PLACEHOLDER': 'Digite o texto do comentário',
            'COMMENT_FORM_SAVE': 'Salvar comentário',
            'COMMENT_VOTE_SCORE_PLURAL': '{count, plural, =0 {Votos} one {Voto} other {Votos}}',
            'CONFIRM_BUTTON_CANCEL': 'Não',
            'CONFIRM_BUTTON_OK': 'Sim, eu confirmo',
            'CONFIRM_TITLE': 'Atenção',

            'POST': 'Post',
            'POST_AUTHOR': 'Autor',
            'POST_AUTHOR_FORM_PLACEHOLDER': 'Digite o nome do autor do post',
            'POST_BODY': 'Texto',
            'POST_BODY_FORM_PLACEHOLDER': 'Digite o texto do post',
            'POST_CATEGORY': 'Categoria',
            'POST_CATEGORY_FORM_PLACEHOLDER': 'Selecione a categoria do post',
            'POST_COMMENTS': '{count, plural, =0 {comentários} one {comentário} other {comentários}}',
            'POST_COMMENTS_COUNT': '{count, plural, =0 {Nenhum comentário} one {# comentário} other {# comentários}}',
            'POST_FORM_SAVE': 'Salvar post',
            'POST_TIMESTAMP': 'Data de criação',
            'POST_TITLE': 'Título',
            'POST_TITLE_FORM_PLACEHOLDER': 'Digite o título do post',
            'POST_VOTE_SCORE': 'Votos',
            'POST_VOTE_SCORE_PLURAL': '{count, plural, =0 {Votos} one {Voto} other {Votos}}',
            'POSTS_NOT_FOUND': 'Não foi encontrado nenhum post, tente refazer a busca ou criar um novo...',

            'MENU_OPTION_EDIT': 'Editar',
            'MENU_OPTION_DELETE': 'Remover',

            'NEW_COMMENT': 'Novo comentário',

            'ORDER_BY': 'Ordenação',
            'OK': 'Ok',

            'VIEW_POST_DETAILS': 'Visualizar post'
        },
        'MESSAGES': {
            'COMMENT_CREATE_SUCCESS': 'Comentário criado com sucesso!',
            'COMMENT_DELETE_SUCCESS': 'Comentário removido com sucesso!',
            'COMMENT_VOTE_SUCCESS': 'Voto realizado com sucesso!',
            'COMMENT_UPDATE_SUCCESS': 'Comentário atualizado com sucesso!',

            'HTTP_NOT_FOUND': 'Não foi possível conectar-se ao servidor.',

            'LOADING': 'Aguarde um instante...',

            'POST_CREATE_SUCCESS': 'Post criado com sucesso!',
            'POST_DELETE_SUCCESS': 'Post removido com sucesso!',
            'POST_VOTE_SUCCESS': 'Voto realizado com sucesso!',
            'POST_UPDATE_SUCCESS': 'Post atualizado com sucesso!',
            'POST_NOT_FOUND': 'O post não foi encontrado ou já foi removido',

            'REQUIRED_FIELD': 'Campo obrigatório',
            'REMOVE_COMMENT_CONFIRM': 'Você confirma que deseja remover o comentário?',
            'REMOVE_POST_CONFIRM': 'Você confirma que deseja remover o post?',

            'UNKNOWN_ERROR': 'Ocorreu um erro não esperado!'
        }
    }
};

/**
 * https://egghead.io/lessons/react-convert-a-hard-coded-string-using-react-intl-formattedmessage
 */
export const flattenMessages = (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
};