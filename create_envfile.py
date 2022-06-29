# ローカル環境でのみ実行

from glob import glob


def main():
    envs = {}
    for file in glob("*/.env"):
        with open(file) as f:
            for row in f:
                k, v = map(lambda x: x.strip(), row.split("=", 1))
                if v.startswith("'"):
                    v = v[1:-1]
                envs[k] = v
    with open(".cloudbuild.env", "w") as f:
        for k in envs:
            f.write(f"{k}=${{_{k}}}\n")


if __name__ == "__main__":
    main()
