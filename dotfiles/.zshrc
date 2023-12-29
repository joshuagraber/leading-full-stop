export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="gnzh"
HYPHEN_INSENSITIVE="true"
HIST_STAMPS="dd-mm-yyyy"
# Plugins
# Other plugins to consider:
# httpie: https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/httpie/README.md
# json-tools: https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/jsontools/README.md
# common aliases: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/common-aliases
# macos: https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/macos/README.md
# emoji: https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/emoji/README.md
plugins=(z git gh nvm web-search zsh-syntax-highlighting)
# Plugin config
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
source $ZSH/plugins/zsh-interactive-cd/zsh-interactive-cd.plugin.zsh
export ZSH_WEB_SEARCH_ENGINES=(reddit "https://www.reddit.com/search/?q=") # Must be added before sourcing zsh

# source ZSH
source $ZSH/oh-my-zsh.sh


# Brew
eval "$(/opt/homebrew/bin/brew shellenv)"

# NVM
export NVM_HOMEBREW=$(brew --prefix nvm)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Automatically run "nvm use" command when changing directory (https://gist.github.com/tcrammond/e52dfad4c2b36258f83f7a964af10097)
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc

# Iterm
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

# Aliases
## Methods
alias copyfile='emulate -L zsh && clipcopy README.md $1'
alias copypath=copypath                                                                                                                130 ↵
alias shell='echo "sourcing zshrc..." && source ~/.zshrc'

## Suffixes
alias -s md=code
alias -s json=code
alias -s {yml,yaml}=code
alias -s {css,html}=code
alias -s {c,m,}{j,t}s{x,}=code # Glob matches any file with js, cjs, mjs, jsx, ts, tsx extension

## Applications
alias brave='open -a "Brave Browser"'
alias brave_new='open -na "Brave Browser" --args --new-window'
alias chrome='open -a "Google Chrome"'
alias chrome_new='open -na "Google Chrome" --args --new-window'
alias figma='open -a Figma'
alias firefox='open -a "Firefox Developer Edition"'
alias firefox_new='open -na "Firefox Developer Edition" --args --new-window'
alias ghapp='open -a "Github Desktop"'
alias settings='open -a "System Settings"'
alias slack='open -a Slack'

## Git
alias gcls="npx lint-staged && cz"
alias gcals="git add -A && npx lint-staged && cz"
alias gcobn=checkout_by_branch_name_with_npm_install
alias ccoby=checkout_by_branch_name_with_yarn_install
alias gcopn=checkout_by_pr_number_with_npm_install
alias ccopy=checkout_by_pr_number_with_yarn_instal

# Helper functions
# Copy of https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/copypath/copypath.plugin.zsh, defining here rather than using as plugin for performance
function copypath {
  local file="${1:-.}"

  # If argument is not an absolute path, prepend $PWD
  [[ $file = /* ]] || file="$PWD/$file"

  # Copy the absolute path without resolving symlinks
  # If clipcopy fails, exit the function with an error
  print -n "${file:a}" | clipcopy || return 1

  echo ${(%):-"%B${file:a}%b copied to clipboard."}
}

## Git
checkout_by_branch_name_with_npm_install() {
  git checkout "$1" && yarn
}
checkout_by_branch_name_with_yarn_install() {
  git checkout "$1" && yarn
}
checkout_by_pr_number_with_npm_install() {
  gh pr checkout "$1" && npm i
}
checkout_by_pr_number_with_yarn_install() {
  gh pr checkout "$1" && yarn
}