import whitelist from '../../polkaswap-token-whitelist-config/whitelist.json'

type Whitelist = {
  [key: string]: WhitelistItem
}

export interface WhitelistItem {
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
}

export interface WhitelistArrayItem extends WhitelistItem {
  address: string;
}

export const WhitelistAssetsArray: Array<WhitelistArrayItem> = whitelist

export const WhitelistAssets = WhitelistAssetsArray.reduce<Whitelist>((acc, asset) => {
  acc[asset.address] = {
    name: asset.name,
    symbol: asset.symbol,
    decimals: asset.decimals,
    icon: asset.icon
  }
  return acc
}, {})

export function isWhitelistAsset (asset: any): boolean {
  if (!asset.address) {
    return false
  }
  return !!WhitelistAssets[asset.address]
}

const WhitelistIdsBySymbol = WhitelistAssetsArray.reduce<any>((acc, asset) => {
    acc[asset.symbol] = asset.address
    return acc
  }, {})

export function isBlacklistAsset (asset: any): boolean {
  if (!asset.address || !asset.symbol) {
    return false
  }
  const address = WhitelistIdsBySymbol[asset.symbol]
  if (!address) {
    return false
  }
  return address !== asset.address
}
