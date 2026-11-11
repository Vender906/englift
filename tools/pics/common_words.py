"""Слова частини мови для аркушів: { _id: en } (через node і tools/pics/common.js)"""
import json, os, subprocess

DIR = os.path.dirname(os.path.abspath(__file__))


def words(pos):
    js = "const {loadPos}=require('./common');console.log(JSON.stringify(Object.fromEntries(loadPos('%s').map(w=>[w._id,w.en]))))" % pos
    out = subprocess.run(['node', '-e', js], cwd=DIR, capture_output=True, text=True, encoding='utf-8', check=True).stdout
    return {int(k): v for k, v in json.loads(out).items()}
