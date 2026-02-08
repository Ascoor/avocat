# Lexicraft Fetch Failure

## Attempts

1) `git clone --depth 1 https://github.com/AscarTec/lexicraft-icons avocat-frontend/_vendor/lexicraft-icons`

```
Cloning into 'avocat-frontend/_vendor/lexicraft-icons'...
fatal: unable to access 'https://github.com/AscarTec/lexicraft-icons/': CONNECT tunnel failed, response 403
```

2) `GIT_TERMINAL_PROMPT=0 git clone --depth 1 https://github.com/AscarTec/lexicraft-icons avocat-frontend/_vendor/lexicraft-icons`

```
Cloning into 'avocat-frontend/_vendor/lexicraft-icons'...
fatal: unable to access 'https://github.com/AscarTec/lexicraft-icons/': CONNECT tunnel failed, response 403
```

3) `curl -L -o /tmp/lexicraft.zip https://github.com/AscarTec/lexicraft-icons/archive/refs/heads/main.zip`

```
curl: (56) CONNECT tunnel failed, response 403
```

4) `curl -L -o /tmp/lexicraft.zip https://github.com/AscarTec/lexicraft-icons/archive/refs/heads/master.zip`

```
curl: (56) CONNECT tunnel failed, response 403
```

## Blocker

All attempts to reach GitHub failed with `CONNECT tunnel failed, response 403`, which prevents fetching the Lexicraft repository contents.
