import classNames from '../../utils/classNames';

function Regular() {
  return (
    <div
      className={classNames(
        "bg-emerald-700 border-white ring-emerald-700 text-white",
        "flex justify-center items-center border-2 rounded-lg ring-1 h-11 w-11"
      )}
    >
      A<i className="ri-arrow-right-s-fill -m-1"></i>
    </div>
  )
}

function Inverted() {
  return (
    <div
      className={classNames(
        "bg-white border-emerald-700 ring-white text-emerald-700",
        "flex justify-center items-center border-2 rounded-lg ring-1 h-11 w-11"
      )}
    >
      A<i className="ri-arrow-right-s-fill -m-1"></i>
    </div>
  )
}

const Logo = {
  Regular: Regular,
  Inverted: Inverted,
};

export default Logo;