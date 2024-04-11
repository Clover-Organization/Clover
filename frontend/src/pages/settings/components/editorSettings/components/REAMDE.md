Claro! Abaixo estão todas as configurações disponíveis para o Monaco Editor, com uma breve explicação de cada uma:

1. **acceptSuggestionOnEnter**: Define se uma sugestão de código deve ser aceita automaticamente ao pressionar Enter.
   - Tipo: `boolean`
   - Padrão: `true`

2. **autoClosingBrackets**: Define se os colchetes devem ser automaticamente fechados.
   - Tipo: `string`
   - Opções: `'always'`, `'languageDefined'`, `'beforeWhitespace'`, `'languageDefinedOrDefault'`, `'beforeWhitespaceLanguageDefined'`
   - Padrão: `'beforeWhitespaceLanguageDefined'`

3. **autoClosingDelete**: Define se os caracteres de fechamento automático devem ser excluídos ao lado do cursor.
   - Tipo: `string`
   - Opções: `'alwaysDelete'`, `'neverDelete'`, `'auto'`
   - Padrão: `'auto'`

4. **autoClosingOvertype**: Define se os caracteres de fechamento automático devem ser substituídos se estiverem presentes à direita do cursor.
   - Tipo: `string`
   - Opções: `'alwaysOvertype'`, `'neverOvertype'`, `'auto'`
   - Padrão: `'auto'`

5. **autoClosingQuotes**: Define se as aspas devem ser automaticamente fechadas.
   - Tipo: `string`
   - Opções: `'always'`, `'languageDefined'`, `'beforeWhitespace'`, `'languageDefinedOrDefault'`, `'beforeWhitespaceLanguageDefined'`
   - Padrão: `'beforeWhitespaceLanguageDefined'`

6. **autoIndent**: Define se a indentação automática está habilitada.
   - Tipo: `boolean`
   - Padrão: `true`

7. **automaticLayout**: Define se o layout do editor deve ser atualizado automaticamente.
   - Tipo: `boolean`
   - Padrão: `false`

8. **codeLens**: Define se os codelenses devem ser exibidos.
   - Tipo: `boolean`
   - Padrão: `false`

9. **contextmenu**: Define se o menu de contexto do editor deve ser exibido.
   - Tipo: `boolean`
   - Padrão: `true`

10. **cursorBlinking**: Define o estilo de intermitência do cursor.
    - Tipo: `string`
    - Opções: `'blink'`, `'smooth'`, `'phase'`, `'expand'`, `'solid'`
    - Padrão: `'blink'`

11. **cursorSmoothCaretAnimation**: Define se a animação de suavização do cursor está habilitada.
    - Tipo: `boolean`
    - Padrão: `false`

12. **cursorStyle**: Define o estilo do cursor.
    - Tipo: `string`
    - Opções: `'line'`, `'block'`, `'underline'`, `'line-thin'`, `'block-outline'`, `'underline-thin'`
    - Padrão: `'line'`

13. **disableLayerHinting**: Define se o hinting de camada deve ser desativado.
    - Tipo: `boolean`
    - Padrão: `false`

14. **disableMonospaceOptimizations**: Define se as otimizações monoespaçadas devem ser desativadas.
    - Tipo: `boolean`
    - Padrão: `false`

15. **dragAndDrop**: Define se a funcionalidade de arrastar e soltar está habilitada.
    - Tipo: `boolean`
    - Padrão: `true`

16. **emptySelectionClipboard**: Define se a área de transferência deve conter a linha atual quando vazia.
    - Tipo: `boolean`
    - Padrão: `true`

17. **fixedOverflowWidgets**: Define se os widgets de overflow são fixos.
    - Tipo: `boolean`
    - Padrão: `false`

18. **fontLigatures**: Define se as ligaduras de fonte estão habilitadas.
    - Tipo: `boolean`
    - Padrão: `false`

19. **formatOnPaste**: Define se o código deve ser formatado automaticamente ao colar.
    - Tipo: `boolean`
    - Padrão: `false`

20. **formatOnType**: Define se o código deve ser formatado automaticamente ao digitar.
    - Tipo: `boolean`
    - Padrão: `false`

21. **formatOnSave**: Define se o código deve ser formatado automaticamente ao salvar.
    - Tipo: `boolean`
    - Padrão: `false`

22. **glyphMargin**: Define se a margem de glifo está habilitada.
    - Tipo: `boolean`
    - Padrão: `true`

23. **gotoLocation**: Define se o recurso de "Ir para" está habilitado.
    - Tipo: `object`
    - Propriedades: `{ multiple: 'gotoAndPeek', multipleDefinitions: 'gotoAndPeek', multipleTypeDefinitions: 'gotoAndPeek', multipleDeclarations: 'gotoAndPeek', multipleImplementations: 'gotoAndPeek', multipleReferences: 'gotoAndPeek' }`
    - Padrão: `{}`

24. **hideCursorInOverviewRuler**: Define se o cursor deve ser oculto na régua de visão geral.
    - Tipo: `boolean`
    - Padrão: `false`

25. **highlightActiveIndentGuide**: Define se o guia de indentação ativo deve ser realçado.
    - Tipo: `boolean`
    - Padrão: `true`

26. **hover**: Define se as informações de sobreposição devem ser exibidas quando o mouse paira sobre o texto.
    - Tipo: `object`
    - Propriedades: `{ enabled: true }`
    - Padrão: `{ enabled: true }`

27. **letterSpacing**: Define o espaçamento entre letras.
    - Tipo: `number`
    - Padrão: `0`

28. **lightbulb**: Define se o ícone de lâmpada (usado para mostrar ações de código) deve ser exibido.
    - Tipo: `boolean`
    - Padrão: `true`

29. **lineDecorationsWidth**: Define a largura das decorações de linha.
    - Tipo: `number`
    - Padrão: `0`

30. **lineNumbers**: Define se os números de linha devem ser exibidos.
    - Tipo: `string`
    - Opções: `'on'`, `'off'`, `'relative'`, `'interval'`
    - Padrão: `'on'`

Essas são apenas algumas das configurações disponíveis no Monaco Editor. Cada uma delas oferece controle sobre vários aspectos da aparência e do comportamento do editor. Você pode ajustar essas configurações conforme necessário para atender aos requisitos específicos do seu aplicativo.